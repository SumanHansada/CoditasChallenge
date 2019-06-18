import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  gitHubDataFromAPI: any;
  totalResults: number;
  gitHubUsers: any;
  gitHubUserDetails: any[];
  constructor(private searchService: SearchService) {
    this.gitHubUserDetails = [];
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

}
