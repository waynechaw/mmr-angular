import { Component, OnInit } from '@angular/core';
import { AppService }  from '../app.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ChallengeItemComponent }  from './challenge-item/challenge-item.component';
import { MasteryItemComponent }  from './mastery-item/mastery-item.component';
import championData2 from '../data/championData2.json';
import champLaneData from '../data/champLaneData.json';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';

@Component({
  selector: 'app-mastery',
  standalone: true,
  imports: [CommonModule, ChallengeItemComponent, MasteryItemComponent, NgbDropdownModule, NgbTooltipModule, FormsModule],
  templateUrl: './mastery.component.html',
  styleUrl: './mastery.component.scss',
  providers: [
    AppService
  ],
})
export class MasteryComponent implements OnInit  {
  public activeProfileInfo;
  public userChallengeData;
  public masteryData;
  public filteredData;
  public challengeLoading = true;
  public masteryLoading = true;
  public hideM5;
  public hideM6;
  public hideM7;
  public hideM8;
  public hideM9;
  public hideM10;
  public sortMethod = 'level-down';
  public selectedRoles: string[] = [ ];
  public selectedLane = '';
  public showChests;
  public totalPoints = 0;
  public avgPointsPerDay;
  public profileIcon;
  public upgradeTime; 
  public catchNextUpgrade: any;
  public catchemAllMode = false;
  public oneTrickSelected;

  public t1ChestsEarned = 0;
  public t2ChestsEarned = 0;

  constructor(private router: Router, private  appService: AppService,) { 
    this.activeProfileInfo = this.appService.activeProfileInfo;
  }

  ngOnInit() {

    this.hideM5 = localStorage.getItem("hideM5");
    this.hideM6 = localStorage.getItem("hideM6");
    this.hideM7 = localStorage.getItem("hideM7");
    this.hideM8 = localStorage.getItem("hideM8");
    this.hideM9 = localStorage.getItem("hideM9");
    this.hideM10 = localStorage.getItem("hideM10");


    this.sortMethod = localStorage.getItem("sortMethod") || 'level-down';

    if (!this.appService.activeProfileInfo) {
      this.router.navigate(['/']);
      return;
    }
    this.getProfilePic();
    this.getMastery();
  }

  restart() {
    this.appService.resetProfile(this.totalPoints);
    this.getMastery();
  }

  chestClicked() {
    this.showChests = !this.showChests;
  }

  selectLane(lane) {
    if (lane == this.selectedLane) {
      this.selectedLane = '';
    } else {
      this.selectedLane = lane;
    }
    this.sort();
  }

  levelFilterChanged() {
    this.sort();
  }

  getMasteryChallengeData() {
    this.appService.getMasteryChallengeData({
      puuid: this.appService.activeProfileID,
      region: this.appService.activeProfileInfo.region
    }).subscribe((resp: any) => {
      this.userChallengeData = resp.data;
      this.challengeLoading = false;
      this.calculateCatchemAllStats();
    }, (resp) => {
    })
  }

  getProfilePic() {
    this.appService.getProfilePic({
      puuid: this.appService.activeProfileID,
      region: this.appService.activeProfileInfo.region
    }).subscribe((resp: any) => {
      this.profileIcon = resp.data.profileIconId;
    }, (resp) => {
    })
  }

  getMastery() {
    this.appService.getMastery({
      puuid: this.appService.activeProfileID,
      region: this.appService.activeProfileInfo.region
    }).subscribe((resp: any) => {
      this.masteryData = resp.data;
        let currentTotal = 0;
        resp.data.forEach(item => {
          currentTotal = currentTotal + parseInt(item.championPoints);
        })
        this.totalPoints = currentTotal;
        let timeElapsed;
        let currentDate = new Date();
        if ((currentDate.getTime()  - new Date(this.activeProfileInfo.dateStarted).getTime() )   < (24 * 60 * 60 * 1000)) {
          timeElapsed = 24 * 60 * 60 * 1000;
        } else {
          timeElapsed = currentDate.getTime()  - new Date(this.activeProfileInfo.dateStarted).getTime() ;
        }
        let expEarned = currentTotal - this.activeProfileInfo.startingEXP;
        this.avgPointsPerDay = expEarned / (timeElapsed / (24 * 60 * 60 * 1000));
        this.transformData();
        this.getMasteryChallengeData();
    }, (resp) => {
    })
  }

  championClicked(event) {
    console.log(123);
    let focusIds = this.filteredData.filter(item => item.focus).map(item => item.championId);

    console.log(focusIds);

    localStorage.setItem('focusIds', JSON.stringify(focusIds));

    this.sort();
  }

  transformData() {


    let focusIds: any = localStorage.getItem('focusIds');
    if (!focusIds) {
      focusIds = [];
    } else {
      focusIds = JSON.parse(focusIds);
    }

    this.masteryData.forEach(item => {
      if (focusIds && focusIds.includes(item.championId)) {
        item.focus = true;
      }
    })

    let t1ChestsEarned = 0;
    let t2ChestsEarned = 0;

    let masteryDataIds = this.masteryData.map(item => item.championId);
    for (let prop in championData2) {
      if (!masteryDataIds.includes(Number(championData2[prop].key))) {
        let unplayedChamp = {
            "championId": championData2[prop].key,
            "championLevel": 1,
            "championPoints": 0,
            "lastPlayTime": -Infinity ,
            "championPointsSinceLastLevel": 0,
            "championPointsUntilNextLevel": 1800,
            "markRequiredForNextLevel": 0,
            "tokensEarned": 0,
            "championSeasonMilestone": 0,
            "nextSeasonMilestone": {
                "requireGradeCounts": {
                    "B-": 1,
                    "C-": 4
                },
                "rewardMarks": 1,
                "bonus": false,
                "rewardConfig": {
                    "rewardValue": "5f4333db-e90d-4705-903b-08dbf5e61006",
                    "rewardType": "HEXTECH_CHEST",
                    "maximumReward": 6
                }
            }
        }
        console.log(unplayedChamp, 432423);
        this.masteryData.push(unplayedChamp);
      }

    }

    this.masteryData.forEach((item, index) => {

      if (item.championSeasonMilestone > 0) {
        t1ChestsEarned ++;
      } 


      if (item.championSeasonMilestone > 2) {
        t2ChestsEarned ++;
      } 



      this.t1ChestsEarned = Math.min(6, t1ChestsEarned);
      this.t2ChestsEarned = Math.min(25, t2ChestsEarned);

      for (let champ in championData2) {
        let champData = championData2[champ];
        let key = champData.key;
        if (item.championId == key) {
          item.name = champData.id;
          item.displayName = champData.name;
          item.roles = champData.tags;
        }
      }

      let champLane = champLaneData.find(laneItem => laneItem.id == item.championId)
      item.lanes = champLane!.roles;
      item.index = index;
    })
    this.masteryLoading = false;
    this.filteredData = this.masteryData.slice();
    setTimeout(() => {
      this.sort();
    }, 1000);
  }

  changeSort(sortMethod) {
    this.sortMethod = sortMethod;
    this.sort();

    localStorage.setItem("sortMethod", sortMethod);
  }

  challengeClicked(event) {

    console.log(event);

    if (event.id == 401104 || event.id == 401107) {
      if (this.userChallengeData.masterEnemy.selected) {
        if (this.userChallengeData.masterYourself.selected) {
          this.hideM10 = true;
          this.hideM9 = true;
          this.hideM8 = true;
          this.hideM7 = true;
          this.hideM6 = true;
          this.hideM5 = true;
        } else {

          this.hideM10 = true;
          this.hideM9 = false;
          this.hideM8 = false;

          this.hideM7 = false;
          this.hideM6 = false;
          this.hideM5 = false;
        }
      } else {
        if (this.userChallengeData.masterYourself.selected) {


          this.hideM10 = true;
          this.hideM9 = true;
          this.hideM8 = true;

          this.hideM7 = true;
          this.hideM6 = true;
          this.hideM5 = true;
        } else {


          this.hideM10 = false;
          this.hideM9 = false;
          this.hideM8 = false;


          this.hideM7 = false;
          this.hideM6 = false;
          this.hideM5 = false;
        }
      }
    }


    this.selectedRoles = [];

    if (this.userChallengeData.masterFighter.selected) {
      this.selectedRoles.push('Fighter');
    }
    if (this.userChallengeData.masterTank.selected) {
      this.selectedRoles.push('Tank');
    }
    if (this.userChallengeData.masterMarksman.selected) {
      this.selectedRoles.push('Marksman');
    }
    if (this.userChallengeData.masterSupport.selected) {
      this.selectedRoles.push('Support');
    }
    if (this.userChallengeData.masterMage.selected) {
      this.selectedRoles.push('Mage');
    }
    if (this.userChallengeData.masterAssassin.selected) {
      this.selectedRoles.push('Assassin');
    }

    if (this.userChallengeData.catchemAll.selected) {


        this.hideM10 = false;
        this.hideM9 = false;
        this.hideM8 = false;

      this.hideM7 = false;
      this.hideM6 = false;
      this.hideM5 = false;
      this.catchemAllMode = true;
    } else {
      this.catchemAllMode = false;
    }

    if (this.userChallengeData.oneTrick.selected) {
      this.oneTrickSelected = true;
    } else {
      this.oneTrickSelected = false;
    }


    this.sort();


  }

  sort() {
    this.filteredData = this.masteryData.slice();
    if (this.sortMethod == 'level-down' ) {    
      this.filteredData.sort((a, b) => {
        return b.championLevel - a.championLevel;
      })
    } else if (this.sortMethod == 'level-up' ) {
       this.filteredData.sort((a, b) => {
        return a.championPoints - b.championPoints;
      })
    } else if (this.sortMethod == 'points-down' ) {
       this.filteredData.sort((a, b) => {
        return b.championPoints - a.championPoints;
      })
    } else if (this.sortMethod == 'points-up' ) {
       this.filteredData.sort((a, b) => {
        return a.championPoints - b.championPoints;
      })
    } else if (this.sortMethod == 'alphabetically-down' ) {
      this.filteredData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    } else if (this.sortMethod == 'alphabetically-up' ) {
      this.filteredData.sort((a, b) => {
        return b.name.localeCompare(a.name);
      })
    } else if (this.sortMethod == 'lastplayed-down' ) {
      this.filteredData.sort((a, b) => {
        return b.lastPlayTime - a.lastPlayTime;
      })
    } else if (this.sortMethod == 'lastplayed-up' ) {
      this.filteredData.sort((a, b) => {
        return a.lastPlayTime - b.lastPlayTime;
      })
    } else if (this.sortMethod == 'milestones-down' ) {


      this.filteredData.sort((a, b) => {
        return b.completedGrades - a.completedGrades;
      })

      this.filteredData.sort((a, b) => {
        return b.championSeasonMilestone - a.championSeasonMilestone;
      })
    } else if (this.sortMethod == 'milestones-up' ) {


      this.filteredData.sort((a, b) => {
        return a.completedGrades - b.completedGrades;
      })

      this.filteredData.sort((a, b) => {
        return a.championSeasonMilestone - b.championSeasonMilestone;
      })
    } else if (this.sortMethod == 'smart' ) {
      this.filteredData.sort((a, b) => {
        return b.lastPlayTime - a.lastPlayTime;
      })

      this.filteredData.sort((a, b) => {
        return b.completedGrades - a.completedGrades;
      })

      this.filteredData.sort((a, b) => {
        return b.championSeasonMilestone - a.championSeasonMilestone;
      })


    } else if (this.sortMethod == 'grades-down' ) {
      this.filteredData.sort((a, b) => {
        return b.completedGrades - a.completedGrades;
      })
    } else if (this.sortMethod == 'grades-up' ) {
      this.filteredData.sort((a, b) => {
        return a.completedGrades - b.completedGrades;
      })
    }

    this.filteredData = [
      ...this.filteredData.filter(item => item.focus),
      ...this.filteredData.filter(item => !(item.focus))
    ];

    this.applyMasteryFilter();
  }

  applyMasteryFilter() {
    if (this.hideM5) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 5;
      })
      localStorage.setItem("hideM5", 'true');
    } else {
      localStorage.removeItem("hideM5");
    }

    if (this.hideM6) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 6;
      })
      localStorage.setItem("hideM6", 'true');
    } else {
      localStorage.removeItem("hideM6");
    }

    if (this.hideM7) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 7;
      })
      localStorage.setItem("hideM7", 'true');
    } else {
      localStorage.removeItem("hideM7");
    }

    if (this.hideM8) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 8;
      })
      localStorage.setItem("hideM8", 'true');
    } else {
      localStorage.removeItem("hideM8");
    }

    if (this.hideM9) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 9;
      })
      localStorage.setItem("hideM9", 'true');
    } else {
      localStorage.removeItem("hideM9");
    }


    if (this.hideM10) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel < 10;
      })
      localStorage.setItem("hideM10", 'true');
    } else {
      localStorage.removeItem("hideM10");
    }



    this.applyRolesFilter();

  }

  applyRolesFilter() {
    if (this.selectedRoles.length == 0) {
      return this.applyLanesFilter();
    } else {
      this.filteredData = this.filteredData.filter(item => {
        let hasAllRoles = true;

        this.selectedRoles.forEach(role => {
          if (!item.roles.includes(role)) {
            hasAllRoles = false;
          }
        })

        return hasAllRoles;
      })
    }
    this.applyLanesFilter();
  }

  applyLanesFilter() {

    if (!this.selectedLane) {
      return this.applyCatchemAllFilter();
    } else {
      this.filteredData = this.filteredData.filter(item => {
        return item.lanes.indexOf(this.selectedLane) > -1;
      })
    }
    this.applyCatchemAllFilter();
  }

  applyCatchemAllFilter() {
    if (!this.catchemAllMode) {
      return this.applyOneTrickFilter();
    } else {
      this.filteredData = this.filteredData.filter(item => {
        return item.championPoints < this.catchNextUpgrade;
      })
      this.applyOneTrickFilter();
    }
  }

  applyOneTrickFilter() {
    if (this.oneTrickSelected) {    
      this.filteredData = this.filteredData.filter(item => {
        return item.championPoints == this.userChallengeData.oneTrick.value;
      })
    }
  }

  calculateCatchemAllStats() {
    this.getNextUpgrade(this.userChallengeData.catchemAll.value);
    let totalNeeded = this.catchNextUpgrade * 150;
    let currentProgress = 0;

    let top150 = this.masteryData.slice(0, 150);
    top150.forEach(item => {
      let pointsEarned: any = 0;
      if (item.championPoints >= this.catchNextUpgrade) {
        pointsEarned = this.catchNextUpgrade;
      } else {
        pointsEarned = parseInt(item.championPoints);
      }
      currentProgress = currentProgress + pointsEarned;
    })

    this.upgradeTime;

    if (this.avgPointsPerDay == 0) {
      this.upgradeTime = 'Need more data';
    } else {
      this.upgradeTime = Math.floor((totalNeeded - currentProgress) / this.avgPointsPerDay) + ' days';
    }

  }


  getNextUpgrade(score) {
    if (score < 100) {
      this.catchNextUpgrade = 100;
    } else if (score >= 100 && score < 500) {
      this.catchNextUpgrade = 500;
    } else if (score >= 500 && score < 1000) {
      this.catchNextUpgrade = 1000;
    } else if (score >= 1000 && score < 5000) {
      this.catchNextUpgrade = 5000;
    } else if (score >= 5000 && score < 10000) {
      this.catchNextUpgrade = 10000;
    } else if (score >= 10000 && score < 50000) {
      this.catchNextUpgrade = 50000;
    } else if (score >= 50000 && score < 100000) {
      this.catchNextUpgrade = 100000;
    } else {
      this.catchNextUpgrade = null;
    }
  }



}
