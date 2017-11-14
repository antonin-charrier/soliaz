import { Component, Input } from '@angular/core';
import { PostContent, VideoPostContent } from 'models';

@Component({
    templateUrl: 'video-post-content.html',
    selector: 'video-post-content'
})
export class VideoFeedContentComponent {
    @Input() postContent: VideoPostContent;
}