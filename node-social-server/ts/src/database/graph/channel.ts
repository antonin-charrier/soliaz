import { GraphItem, Prop } from "../decorators";
import { Vertex, Edge }  from "../dbtypes";
import { Post } from "./post";

@GraphItem("Channel")
export class Channel extends Vertex {
    @Prop({
        indexed: true,
        mandatory: true
    })
    name: string;
}

@GraphItem("CHANNEL_POST")
export class ChannelPostEdge extends Edge<Channel, Post> {
}
