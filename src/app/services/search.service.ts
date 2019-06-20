import { Config } from './../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchUrl: string;
  reposUrl: string;

  constructor(private http: HttpClient) {
    this.searchUrl = 'https://api.github.com/search/users?q=';
    this.reposUrl = 'https://api.github.com/users';
  }

  getGitHubUsers(searchString: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}${searchString}&client_id=${Config.client_id}
    &client_secret=${Config.client_secret}&per_page=10`);
  }

  getGitHubRepos(userName: string): Observable<any> {
    return this.http.get<any>(`${this.reposUrl}/${userName}/repos?client_id=${Config.client_id}&client_secret=${Config.client_secret}`);
  }

  getGitHubUserDetails(userName: string): Observable<any> {
    return this.http.get<any>(`${this.reposUrl}/${userName}?client_id=${Config.client_id}&client_secret=${Config.client_secret}`);
  }
}
