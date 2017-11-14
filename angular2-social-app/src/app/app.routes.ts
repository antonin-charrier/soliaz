import { Routes } from '@angular/router';
import { LoginComponent, RegisterComponent, SocialAppComponent, SocialFeedComponent } from 'components';
import { AuthGuard } from './services/AuthGuard';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/channel', pathMatch: 'full' },
    { path: 'channel', 
        component: SocialAppComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: ':id', component: SocialFeedComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];