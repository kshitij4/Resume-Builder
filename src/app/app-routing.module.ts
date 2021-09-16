import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeComponent } from './resume/resume.component';
import { UsersGuard } from './services/users.guard';
import { SearchComponent } from './resume/search/search.component';
import { TemplateComponent } from './resume/template/template.component';
import { ResolverGuard } from './services/resume-resolver.guard';
import { ProfileResolverGuard } from './services/profile-resolver.guard';
import { EditComponent } from './profile/edit/edit.component';
import { ForgotPassComponent } from './login/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './login/reset-pass/reset-pass.component';
import { ResetPassResolverGuard } from './services/reset-pass-resolver.guard';
import { UpdateComponent } from './resume/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: ForgotPassComponent },
  {
    path: 'reset-password/:id/:token',
    component: ResetPassComponent,
    resolve: {
      userEmail: ResetPassResolverGuard,
    },
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UsersGuard],
    resolve: {
      profileData: ProfileResolverGuard,
    },
  },
  {
    path: 'profile/edit',
    component: EditComponent,
    canActivate: [UsersGuard],
    resolve: {
      profileData: ProfileResolverGuard,
    },
  },
  { path: 'resume', component: ResumeComponent, canActivate: [UsersGuard] },
  {
    path: 'template/update/:username',
    component: UpdateComponent,
    resolve: {
      resumeData: ResolverGuard,
    },
  },
  { path: 'search', component: SearchComponent, canActivate: [UsersGuard] },
  {
    path: 'template/:username',
    component: TemplateComponent,
    canActivate: [UsersGuard],
    resolve: {
      templateData: ResolverGuard,
    },
  },
  { path: '**', redirectTo: '/resume' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
