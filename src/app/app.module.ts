import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './resume/template/template.component';
import { SearchComponent } from './resume/search/search.component';
import { ResumeComponent } from './resume/resume.component';

import { UsersService } from './services/users.service';
import { UsersGuard } from './services/users.guard';
import { TokenInerceptorService } from './services/token-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditComponent } from './profile/edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPassComponent } from './login/forgot-pass/forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    ResumeComponent,
    TemplateComponent,
    SearchComponent,
    EditComponent,
    ForgotPassComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    MatRadioModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
  ],
  providers: [
    UsersService,
    UsersGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInerceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
