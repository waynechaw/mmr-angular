import { Component, OnInit } from '@angular/core';
import { AppService }  from '../app.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ChallengeItemComponent }  from './challenge-item/challenge-item.component';
import { MasteryItemComponent }  from './mastery-item/mastery-item.component';
import championData from '../data/championData.json';
import champLaneData from '../data/champLaneData.json';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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

  public sortMethod = 'level';

  // public selectedRoles = ['Tank', 'Marksman', 'Support', 'Fighter', 'Mage', 'Assassin', ];
  public selectedRoles: string[] = [ ];
  public selectedLane = '';

  public showChests;

  constructor(private  appService: AppService,) { 

  }

  ngOnInit() {
    this.getMasteryChallengeData();
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
    }, (resp) => {

    })
  }

  getMastery() {
    this.appService.getMastery({
      puuid: this.appService.activeProfileID,
      region: this.appService.activeProfileInfo.region
    }).subscribe((resp: any) => {
      this.masteryData = resp.data;
      this.transformData();
    }, (resp) => {
      
    })
  }

  transformData() {
    this.masteryData.forEach(item => {
      item.roles = championData[item.championId].tags;
      item.name = championData[item.championId].id;
      let champLane = champLaneData.find(laneItem => laneItem.id == item.championId)
      item.lanes = champLane!.roles;
    })
    this.masteryLoading = false;
    this.filteredData = this.masteryData.slice();
    this.sort();
  }

  changeSort(sortMethod) {
    this.sortMethod = sortMethod;
    this.sort();
  }

  sort() {
    this.filteredData = this.masteryData.slice();
    if (this.sortMethod == 'level' ) {    
      this.filteredData.sort((a, b) => {
        return b.championLevel - a.championLevel;
      })
    } else if (this.sortMethod == 'points' ) {
       this.filteredData.sort((a, b) => {
        return b.championPoints - a.championPoints;
      })
    } else if (this.sortMethod == 'alphabetically' ) {
      this.filteredData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    }
    this.applyMasteryFilter();
  }

  challengeClicked(event) {
    console.log(this.userChallengeData);

    if (this.userChallengeData.masterEnemy.selected) {
      if (this.userChallengeData.masterYourself.selected) {
        this.hideM7 = true;
        this.hideM6 = true;
        this.hideM5 = true;
      } else {
        this.hideM7 = true;
        this.hideM6 = false;
        this.hideM5 = false;
      }
    } else {
      if (this.userChallengeData.masterYourself.selected) {
        this.hideM7 = true;
        this.hideM6 = true;
        this.hideM5 = true;
      } else {
        this.hideM7 = false;
        this.hideM6 = false;
        this.hideM5 = false;
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
    this.sort();


  }

  applyMasteryFilter() {
    if (this.hideM5) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 5;
      })
    }

    if (this.hideM6) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 6;
      })
    }

    if (this.hideM7) {
      this.filteredData = this.filteredData.filter(item => {
        return item.championLevel != 7;
      })
    }

    this.applyRolesFilter();

  }

  applyRolesFilter() {
    if (this.selectedRoles.length == 0) {
      this.applyLanesFilter();
    } else {
      this.filteredData = this.filteredData.filter(item => {
        return item.roles.some(value => this.selectedRoles.includes(value));
      })
    }
    this.applyLanesFilter();
  }

  applyLanesFilter() {
    if (!this.selectedLane) {
      return;
    } else {
      this.filteredData = this.filteredData.filter(item => {
        return item.lanes.indexOf(this.selectedLane) > -1;
      })
    }
  }


}
