import { GraphItem, Prop } from "../decorators";
import { Vertex, Edge }  from "../dbtypes";

@GraphItem("Post")
export class Post extends Vertex {
    @Prop({
        mandatory: true
    })
    message: string;
}

@GraphItem("POST_COMMENT")
export class PostCommentEdge extends Edge<Post, Post> {
}
