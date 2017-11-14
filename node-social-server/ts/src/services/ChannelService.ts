import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { IGraphDb } from "./IGraphDb";
import { NewChannel, NewPost } from "../models/request";
import { Channel, Post, UserPostEdge, ChannelPostEdge } from "../database/graph";
import { UserStore, SocketService } from "./index";
import * as _ from "lodash";

@injectable()
export class ChannelService {
    constructor(
        @inject(TYPES.IGraphDb) private db: IGraphDb,
        @inject(TYPES.UserStore) private userStore: UserStore,
        @inject(TYPES.SocketService) private socketService: SocketService
    ) {
    }

    create(newChannel: NewChannel): Promise<Channel> {
        const channel = new Channel();
        channel.name = newChannel.name;

        return this.db.createVertex(channel).then( c => {
            this.socketService.emit("channel:add", channel);
            return c;
        });
    }

    find(id: string) {
        return this.db.first<any>(`match (c:Channel {id: {id}}) return c`, {id})
            .then( r => r && r.c ? new Channel(r.c) : null );
    }

    findAll() {
        return this.db.query<any>(`match (c:Channel) return c`)
            .then( results => results.map( r => r.c ));
    }

    getPosts(id: string, userId: string): Promise<any> {
        return this.db.query<any>(`
            match (c:Channel {id: {id}})-[]-(p:Post)
            match (issuer:User)-[:USER_POST]-(p)
            optional match (uLike:User {id: {userId}})-[l:LIKE*0..1]-(p)
            with  p, issuer, c, case when l is not null then true else false end as liked
            optional match (p)-[:POST_COMMENT]-(comment:Post)-[:USER_COMMENT]-(commenter:User)
            return p, issuer, c, liked,
                case when comment is not null then collect({post: comment, issuer: commenter}) else [] end as comments
            order by p.creationTime desc
        `, {id, userId})
        .then( res => res.map(r => {
            r.p.user = {
                id:  r.issuer.id,
                username: r.issuer.username,
                pictureUrl: r.issuer.pictureUrl || ""
            };
            r.p.channel = r.c;
            r.p.liked = r.liked;
            r.p.comments = r.comments.map( c => {
                c.post.user =  {
                    id:  c.issuer.id,
                    username: c.issuer.username,
                    pictureUrl: c.issuer.pictureUrl || ""
                };
                c.post.channel = r.c;
                return c.post;
            } );
            r.p.comments = _.orderBy<any>(r.p.comments, c => c.creationTime);
            return r.p;
        }));
    }

    async addPost(id: string, newPost: NewPost ): Promise<Post> {
        const post = new Post();
        post.message = newPost.message;

        const user = await this.userStore.find(newPost.userId);
        const channel = await this.find(id);
        
        if (!user) {
            throw new Error("Unknown user");
        }
        if (!channel) {
            throw new Error("Unknown channel");
        }

        return this.db.transaction<Post>( async db => {
            await db.createVertex(post);
            const userPost = new UserPostEdge(user, post);
            const channelPost = new ChannelPostEdge(channel, post);
            await db.createEdge(userPost);
            await db.createEdge(channelPost);

            return post;
        } ).then( p => {
            let post: any = p;
            post.user = {
                id: user.id,
                username: user.username,
                pictureUrl: user.pictureUrl
            };
            post.channel = channel;
            post.liked = false;
            post.comments = [];
            this.socketService.emit("post:add", post);
            return p;
        });
    }
}
