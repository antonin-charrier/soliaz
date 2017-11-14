import { GraphItem, Prop } from "../decorators";
import { Vertex, Edge }  from "../dbtypes";
import { Post } from "./post";

@GraphItem("User")
export class User extends Vertex {
    @Prop({
        readonly: true,
        mandatory: true,
        indexed: true,
        unique: true
    }) username: string;

    @Prop({
        mandatory: true,
        indexed: true,
        unique: true
    }) email: string;

    @Prop({
        mandatory: true,
    }) passwordHash: string;

    @Prop({
        indexed: true,
        unique: true
    }) accessToken: string;

    @Prop({
        mandatory: true,
        indexed: true
    })
    enabled: boolean;

    @Prop()
    pictureUrl: string;
}

@GraphItem("USER_POST")
export class UserPostEdge extends Edge<User, Post> {
}

@GraphItem("LIKE")
export class LikeEdge extends Edge<User, Post> {
}

@GraphItem("USER_COMMENT")
export class UserCommentEdge extends Edge<User, Post> {
}