import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  page = 1;
  pageSize = 5;
  gitHubDataFromAPI: any;
  totalResults: number;
  gitHubUsers: any;
  gitHubUserDetails: any[];
  gitHubRepos: any[];
  constructor(private searchService: SearchService) {
    this.gitHubUserDetails = [];
    this.gitHubRepos = [];
  }
  ngOnInit() {
  }

  onKeyUp(searchKey: string) {
    console.log(searchKey);
    this.searchService.getGitHubUsers(searchKey)
    .subscribe(result => {
      this.gitHubDataFromAPI = result;
      this.totalResults = this.gitHubDataFromAPI.total_count;
      this.gitHubUsers = this.gitHubDataFromAPI.items;
      this.gitHubUserDetails = [];
      if (this.gitHubUsers.length > 0) {
        this.gitHubUsers.forEach(user => {
        this.searchService.getGitHubUserDetails(user.login)
          .subscribe(userData => {
            this.gitHubUserDetails.push(userData);
          });
        });
      }
    });
  }
  getReposData(userName: string, event) {
    console.log(userName);
    console.log(event);
    if (event.srcElement.innerText === 'Details') {
      event.srcElement.innerText = 'Collapse';
    } else {
      event.srcElement.innerText = 'Details';
    }

    this.searchService.getGitHubRepos(userName)
    .subscribe(result => {
      this.gitHubRepos = result;
      console.log(this.gitHubRepos);
    });
  }
  sortByNameAscending() {
    this.gitHubUsers.sort((a, b) => {
      const nameA = a.login.toUpperCase();
      const nameB = b.login.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(this.gitHubUsers);
  }

  sortByNameDescending() {
    this.gitHubUsers.sort((a, b) => {
      const nameA = a.login.toUpperCase();
      const nameB = b.login.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    console.log(this.gitHubUsers);
  }
}
