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
  currentPage = 1;
  pageSize = 5;
  isCollapsed: boolean[];
  gitHubDataFromAPI: any;
  totalResults: number;
  gitHubUsers: any;
  gitHubUserDetails: any[];
  gitHubRepos: any[];
  constructor(private searchService: SearchService) {
    this.isCollapsed = [];
    this.gitHubUserDetails = [];
    this.gitHubRepos = [];
  }
  ngOnInit() {
  }

  onKeyUp(searchKey: string) {
    console.log('Search Query :- ' + searchKey);
    this.searchService.getGitHubUsers(searchKey)
    .subscribe(result => {
      this.gitHubDataFromAPI = result;
      this.totalResults = this.gitHubDataFromAPI.total_count;
      this.gitHubUsers = this.gitHubDataFromAPI.items;
      this.gitHubUserDetails = [];
      if (this.gitHubUsers.length > 0) {
        this.gitHubUsers.forEach(user => {
        this.isCollapsed.push(true);
        this.searchService.getGitHubUserDetails(user.login)
          .subscribe(userData => {
            this.gitHubUserDetails.push(userData);
          });
        });
      }
    });
  }
  getReposData(userName: string, event: any) {
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

  checkCollapse(index: number) {
    const collapseButtons = document.querySelectorAll('*[id^="detailsButton"]');
    console.log(collapseButtons);
    for (let i = 0; i < this.isCollapsed.length; i++) {
      if (i !== index) {
        this.isCollapsed[i] = true;
      }
    }
    for (let j = 0; j < collapseButtons.length; j++) {
      if (j !== (index % this.pageSize)) {
        collapseButtons[j].innerHTML = 'Details';
      }
    }
    if (collapseButtons[index].innerHTML === 'Collapse') {
      collapseButtons[index].innerHTML = 'Details';
    } else {
      collapseButtons[index].innerHTML = 'Collapse';
    }
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  pageChange(event: any) {
    console.log('Currently in Page :- ' + event);
    const collapseButtons = document.querySelectorAll('*[id^="detailsButton"]');
    if (this.currentPage !== this.page) {
      this.currentPage = this.page;
      for (let i = 0; i < this.isCollapsed.length; i++) {
        this.isCollapsed[i] = true;
      }
      for (const btn of Array.from(collapseButtons)) {
        btn.innerHTML = 'Details';
      }
    }
  }
}
