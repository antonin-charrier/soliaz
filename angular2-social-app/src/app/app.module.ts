import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ModalModule, AccordionModule } from 'ngx-bootstrap';
import { rootRouterConfig } from './app.routes';
import * as components from './components';
import * as services from 'services';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { authenticatedHttpFactory } from './services/AuthenticatedHttp'

@NgModule({
    declarations: [
        components.AddChannelComponent,
        components.AppComponent,
        components.LoginComponent,
        components.MenuComponent,
        components.NotificationBarComponent,
        components.PostCommentComponent,
        components.PostComponent,
        components.PictureFeedContentComponent,
        components.RegisterComponent,
        components.SocialAppComponent,
        components.SocialFeedComponent,
        components.UserInputsComponent,
        components.VideoFeedContentComponent,
        components.YoutubeFeedContentComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        RouterModule.forRoot(rootRouterConfig)
    ],
    providers: [
        AUTH_PROVIDERS,
        services.AuthGuard,
        services.UserStorageService,
        services.SocketService, {
            provide: services.ServerConfiguration,
            useValue: new services.ServerConfiguration()
        },
        services.ChannelService,
        services.PostService,
        services.PostSocketService,
        services.MessageParser,
        services.AuthenticationService,
        {
            provide: services.LoggedUser,
            useFactory: (auth: services.AuthenticationService) => auth.user,
            deps: [services.AuthenticationService]
        },
        services.RegistrationService, {
            provide: services.AuthenticatedHttp,
            useFactory: authenticatedHttpFactory,
            deps: [Http, RequestOptions, services.AuthenticationService]
        }
    ],
    bootstrap: [components.AppComponent]
})
export class AppModule {

}
