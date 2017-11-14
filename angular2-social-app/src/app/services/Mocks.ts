import { Post, Like } from '../models'
import { Injectable } from '@angular/core';


@Injectable()
export class FeedStore {
    items: Post[] = [];
    
    constructor() {
        // var item = new Post();
        // item.body = new TextPostBody("Hello");

        // var comment = new Post();
        // comment.body = new TextPostBody("Eh bein");

        // item.comments = [
        //     comment
        // ]
        // this.items.push(item);
    }
    
    addItem(item: Post){
        this.items.push(item);
    }
}