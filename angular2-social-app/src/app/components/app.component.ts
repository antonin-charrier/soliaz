import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  styles: [
    require('bootstrap/dist/css/bootstrap.min.css'),
    require('./app.component.scss')
  ],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
