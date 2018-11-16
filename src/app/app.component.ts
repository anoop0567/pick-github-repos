import { Component } from '@angular/core';

import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = 'https://api.github.com/users/'
  userName = 'freeCodeCamp';
  repos = []; // User All Repositories
  profileData = []; // User Data
  reposData = []; // Repositories Bucket Data
  responseStatus;
  constructor(http: Http) {
    http.get(this.url + this.userName)
      .subscribe(response => {
        this.responseStatus = response.status;
        this.profileData = response.json();
      })
    http.get(this.url + this.userName + '/repos')
      .subscribe(response => {
        this.responseStatus = response.status;
        this.repos = response.json();
      })
  }
 
  isClicked:boolean;
  bothFatched = [false, false];
  // Getting Repositories Data
  getRepos() {
    this.isClicked = true;
    if (this.userName != '') {
      this.bothFatched[0] = false;
      this.bothFatched[1] = false;
      fetch(this.url + this.userName)
        .then(response => {
          this.responseStatus = response.status;
          return response.json();
        })
        .then(data => {
          this.profileData = data;
          this.bothFatched[0] = true;
          if(this.bothFatched[0] == true && this.bothFatched[1] == true) {
            this.isClicked = false;
          }
        })
      fetch(this.url + this.userName + '/repos')
        .then(response => {
          this.responseStatus = response.status;
          return response.json();
        })
        .then(data => {
          this.repos = data;
          this.bothFatched[1] =true;
          if(this.bothFatched[0] == true && this.bothFatched[1] == true) {
            this.isClicked = false;
          }
        })
    }
  }

  reposCount: number;
  // Adding Repositories
  addRepos(repoName, repoURL, language, forks_count, stargazers_count, user_url, user) {
    this.reposData.unshift({
      name: repoName,
      html_url: repoURL,
      language: language,
      forks_count: forks_count,
      stargazers_count: stargazers_count,
      user_url: user_url,
      user: user
    })
  }

  shortAsc() {
    this.reposData.sort(function (a, b) {
      let astar = a.stargazers_count;
      let bstar = b.stargazers_count;
      if(a.forks_count === b.forks_count) {
        if(astar < bstar) {
          return 1;
        }else {
          return -1;
        }
      }
      return a.forks_count - b.forks_count;
    });
  }

  shortDsc() {
    this.reposData.sort(function (a, b) {
      let astar = a.stargazers_count;
      let bstar = b.stargazers_count;
      if(a.forks_count === b.forks_count) {
        if(astar > bstar) {
          return 1;
        }else {
          return -1;
        }
      }
      return b.forks_count - a.forks_count;
    });
    
  }
  // Removing Repositories
  removeRepos(index) {
    this.reposData.splice(index, 1);
  }
}
