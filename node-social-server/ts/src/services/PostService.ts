import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { IGraphDb } from "./IGraphDb";
import { NewChannel, NewPost } from "../models/request";
import { Channel, Post, UserCommentEdge, LikeEdge, PostCommentEdge } from "../database/graph";
import { UserStore, SocketService } from "./index";

@injectable()
export class PostService {
    constructor(
        @inject(TYPES.IGraphDb) private db: IGraphDb,
        @inject(TYPES.UserStore) private userStore: UserStore,
        @inject(TYPES.SocketService) private socketService: SocketService
    ) {
    }

    find(id: string): Promise<Post> {
        return this.db.first<any>(`match (p:Post {id: {id}})-[:CHANNEL_POST]-(c:Channel) return p, c`, { id })
            .then(r => {
                if (r) {
                    const post: any = new Post(r.p);
                    const channel = new Channel(r.c);
                    post.channel = channel;
                    return post;
                }
                
                return null;
            });
    }

    async like(id: string, userId: string): Promise<LikeEdge> {
        const user = await this.userStore.find(userId);
        const post = await this.find(id);
        const like = await this.db.first<any>(
            `match (:Post {id: {postId}})-[l:LIKE]-(:User {id: {userId}}) return l`,
            { postId: id, userId }
        ).then(r => r && r.l ? r.l : null);

        if (!user) {
            throw new Error("User not exists");
        }
        if (!post) {
            throw new Error("User not exists");
        }
        if (like) {
            return Promise.resolve(like);
        }

        const likeEdge = new LikeEdge(user, post);
        return this.db.createEdge(likeEdge)
            .then(e => {
                this.socketService.emit("post:like", {
                    creationTime: likeEdge.creationTime,
                    post,
                    user
                });
                return e;
            });
    }

    async comment(id: string, newComment: NewPost): Promise<Post> {
        const user = await this.userStore.find(newComment.userId);
        const post = await this.find(id);
        const comment = new Post();
        comment.message = newComment.message;

        if (!user) {
            throw new Error("User not exists");
        }
        if (!post) {
            throw new Error("User not exists");
        }

        return this.db.transaction<Post>(async db => {
            await db.createVertex(comment);
            const userComment = new UserCommentEdge(user, comment);
            const postComment = new PostCommentEdge(comment, post);
            await db.createEdge(userComment);
            await db.createEdge(postComment);

            return comment;
        }).then(e => {
            let c: any = comment;
            c.post = post;
            c.user = {
                id: user.id,
                username: user.username,
                pictureUrl: user.pictureUrl || ""
            };
            this.socketService.emit("post:comment", c);
            return e;
        });
    }
}
