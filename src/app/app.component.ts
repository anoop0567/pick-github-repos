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
  constructor(http:Http) {
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

  // Getting Repositories Data
  getRepos() {
    if (this.userName != '') {
      fetch(this.url + this.userName)
        .then(response => {
          this.responseStatus = response.status;
          return response.json();
        })
        .then(data => {
          this.profileData = data;
        })
       fetch(this.url + this.userName + '/repos')
        .then(response => {
          this.responseStatus = response.status;
           return response.json();
        })
        .then(data => {
          this.repos = data;
        })
    }
  }
  
  // Adding Repositories
  addRepos(repoName, repoURL, language, forks_count, stargazers_count, user_url, user) {
    this.reposData.unshift({ name: repoName,
                             html_url: repoURL , 
                             language : language, 
                             forks_count : forks_count, 
                             stargazers_count : stargazers_count,
                             user_url : user_url,
                             user : user
                            })
  }

  // Removing Repositories
  removeRepos(index) {
    this.reposData.splice(index, 1);
  }
}
