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

  public challenges = [
    203202, //damage sponge
    103304, //disrespect
    301301, //flawless victory
    103102, //get on my level
    210002, //same penta
    302104, //whose lane
    302201, //gsg
    302203, //tmt
    201004, //death incarnate
    302103, //overwhelming
    203404, //three buffed
  ];

  public tableHeader: any[] = [''];
  public usersData: any[] = [];

  public inputText = '';
  public placeholder = 'name#tag';

  constructor(private router: Router, private  appService: AppService,) { 
  }

  ngOnInit() {
    this.challenges.forEach(challengeId => {
      let challengeDetails = challengeData.find(item => {
        return item.id == challengeId;
      });
      this.tableHeader.push(challengeDetails!.translation.name);
    })
    console.log(this.tableHeader);
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
      region: 'NA1'
    }).subscribe((resp: any) => {

      this.getChallengeData(resp.puuid);
      },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

  getChallengeData(puuid) {
    this.appService.getChallengeData({
      puuid: puuid,
      region: 'NA1'
    }).subscribe((resp: any) => {

      let userRow: any[] = [this.inputText];

      this.inputText = '';

      let data = resp.challenges;

      console.log(challengeData);
      console.log(data);

      this.challenges.forEach(challengeId => {
        let challengeDetails = challengeData.find(item => {
          return item.id == challengeId;
        });
        let userProgress = data.find(item => {
          return item.challengeId == challengeId;
        });
        userRow.push(userProgress);
      })

      this.usersData.push(userRow);

    },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

}
