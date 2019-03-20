import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../core/auth/auth.guard";
import { HomeComponent } from "./home.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { PhotoListComponent } from "../photos/photo-list/photo-list.component";
import { PhotoListResolver } from "../photos/photo-list/photo.list.resolver";
import { PhotoFormComponent } from "../photos/photo-form/photo-form.component";
import { NotFoundComponent } from "../errors/not-found/not-found.component";
import { LoginGuard } from "../core/auth/login.guard";

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [LoginGuard],
      children: [
        {
          path: '',
          component: SignInComponent,
          data: {
            title: 'App - Sign in'
          }
        },
        {
          path: 'signup',
          component: SignUpComponent,
          data: {
            title: 'App - Sign up'
          }
        },
      ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {}
