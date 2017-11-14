import { Component, Input } from '@angular/core';
import { Channel } from 'models';

/**
 * Side menu that allow to naviaget inside the differents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];
}