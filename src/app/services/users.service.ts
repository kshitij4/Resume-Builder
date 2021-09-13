import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private uri = environment.uri;
  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${this.uri}/users/login`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  register(body: any) {
    return this.http.post(`${this.uri}/users/register`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  submitResume(body: any) {
    return this.http.post(`${this.uri}/post/submit`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getProfile() {
    return this.http.get<any>(`${this.uri}/users/profile`);
  }

  forgetPass(body: any) {
    return this.http.post(`${this.uri}/users/forgetPassword`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getResetPass(id: any, token: any) {
    return this.http.get(`${this.uri}/users/reset-password/${id}/${token}`);
  }

  updatePass(id: any, token: any, body: any) {
    return this.http.post<any>(
      `${this.uri}/users/reset-password/${id}/${token}`,
      body,
      {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      }
    );
  }

  updateProfile(body: any) {
    return this.http.patch<any>(`${this.uri}/users/profile/`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getResume(username: any) {
    return this.http.get(`${this.uri}/post/resume/${username}`);
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
