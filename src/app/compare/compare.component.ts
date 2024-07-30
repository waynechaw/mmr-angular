import { Component, OnInit } from '@angular/core';
import { AppService }  from '../app.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import challengeData from '../data/challengeData.json';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbTooltipModule, FormsModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
  providers: [
    AppService
  ],
})
export class CompareComponent implements OnInit  {

  public selectedRegion = {
    name: 'NA',
    id: 'NA1'
  };


  public challenges: any = [];


  // public challenges: any = [
  //   203202, //damage sponge
  //   103304, //disrespect
  //   301301, //flawless victory
  //   103102, //get on my level
  //   210002, //same penta
  //   302104, //whose lane
  //   302201, //gsg
  //   302203, //tmt
  //   201004, //death incarnate
  //   302103, //overwhelming
  //   203404, //three buffed
  // ];

  public tableHeader: any[] = [''];
  public usersData: any[] = [];

  public inputText = '';
  public placeholder = 'name#tag';
  public regions;

  constructor(private router: Router, private  appService: AppService,) { 
  }

  ngOnInit() {

    this.regions = this.appService.regions;
    this.selectedRegion = this.appService.selectedRegion;

    this.challenges = localStorage.getItem('challenges');
    if (!this.challenges) {
      this.challenges = '201004,210002,202304,203105,302104,302103,103102,203408,203407,203104,302404,301302,203202,103304,301301';
    }
    this.newTable();
  }

  selectRegion(region) {
    this.selectedRegion = region;
    localStorage.setItem("selectedRegion", JSON.stringify(region));
  }

  newTable(event?: KeyboardEvent) {

    if (!this.challenges) {
      this.challenges = '201004,210002,202304,203105,302104,302103,103102,203408,203407,203104,302404,301302,203202,103304,301301';
    }

    if (typeof this.challenges == 'string') {
      this.challenges = this.challenges.split(',');
    }

    localStorage.setItem('challenges', this.challenges.join(','));


    if ((event && event.keyCode == 13) || !event) {

      this.tableHeader = [''];
      this.usersData = [];

      this.challenges.forEach(challengeId => {
        let challengeDetails = challengeData.find(item => {
          return item.id == challengeId;
        });
        this.tableHeader.push(challengeDetails!.translation.name);
      })
      console.log(this.tableHeader);
    }


  }

  onEnter(event: KeyboardEvent) {
    this.placeholder = 'name#tag';
    if (event.keyCode == 13) {
      let parsed = this.inputText.split('#');
      if (!parsed[0] || !parsed[1]) {
        return;
      }
      this.getAccountData(parsed[0], parsed[1]);
    }

  }

  getAccountData(name, tag) {
    this.appService.getAccount({
      name: name,
      tag: tag,
      region: this.selectedRegion.id
    }).subscribe((resp: any) => {

      this.getChallengeData(resp.puuid);
      },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

  delete(index) {
    this.usersData.splice(index, 1);
    localStorage.setItem("usersData", JSON.stringify(this.usersData));
  }

  getChallengeData(puuid) {
    this.appService.getChallengeData({
      puuid: puuid,
      region: this.selectedRegion.id
    }).subscribe((resp: any) => {

      let userRow: any[] = [this.inputText];

      this.inputText = '';

      let data = resp.challenges;

      this.challenges.forEach(challengeId => {
        let challengeDetails = challengeData.find(item => {
          return item.id == challengeId;
        });
        let userProgress = data.find(item => {
          return item.challengeId == challengeId;
        });

        if (userProgress && challengeDetails) {
          userProgress.masterThreshold = challengeDetails!.thresholds.MASTER;
        }


        console.log(challengeDetails, userProgress);


        userRow.push(userProgress);
      })

      this.usersData.push(userRow);


      localStorage.setItem("usersData", JSON.stringify(this.usersData));

    },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

}
