import { Component, Input, Pipe } from '@angular/core';
import { PostContent, PicturePostContent } from 'models';
@Component({
    templateUrl: 'picture-post-content.html',
    selector: 'picture-post-content'
})
export class PictureFeedContentComponent {
    @Input() postContent: PicturePostContent;
    ngOnInit(){
    }
}
