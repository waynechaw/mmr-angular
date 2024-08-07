import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import champData from './championData.json';
import challengeData from '../data/challengeData.json';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ChampionFilterPipe } from './champion-filter.pipe';

import championData2 from '../data/championData2.json';
import champLaneData from '../data/champLaneData.json';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [NgbTooltipModule, NgbDropdownModule, CommonModule, FormsModule, ChampionFilterPipe],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss'
})
export class ChecklistComponent implements OnInit  {

  public masterList: any[] = [];

  public defaultData: any;

  public championsChecklistData: any;

  public selectedChallenge;

  public score;

  public activeChecklist;

  public rank;
  public nextUpgrade
  public rankColor;

  public challengeDetails;

  public searchText = '';

  public selectedLane = '';

  public lastClicked;

  public toggleHideChecked = false;

  ngOnInit() {

    let masterList = []
      for (let champ in championData2) {
        let champData = championData2[champ];
        let key = champData.key;

        let laneData = champLaneData.find(item => item.id == key);

        champData.lanes = laneData!.roles;

        this.masterList.push(champData);
      }

      this.masterList = this.masterList.map( item => {
        let obj =  {
          name: item.name,
          id: item.id,
          key: item.key,
          lanes: item.lanes
        };

        return obj;
      })



 this.defaultData = {
    'All Random All Champs: 2024 Split 1':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Earn an S- grade or higher on different champions in ARAM'
    },
    'All Random All Champions':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Earn an S- grade or higher on different champions in ARAM'
    },
    'All Random All Champions: 2022':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Earn an S- grade or higher on different champions in ARAM'
    },
    'Perfectionist':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Earn an S+ grade on different champions '
    },
    'Same Penta, Different Champ':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Get a Pentakill with different champions  '
    },
    'Protean Override':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Win a Co-Op vs AI game with different champions '
    },
    'Invincible':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Win a game without dying with different champions '
    },
    'Jack of All Champs':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Win a game with different champions '
    },
    'Champion Ocean':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Play arena with different champions'
    },
    'Adapt to All Situations':  {
      data: JSON.parse(JSON.stringify(this.masterList.slice())),
      selected: false,
      description: 'Win arena with different champions'
    },
  }



    let hideCompleted = localStorage.getItem("hideCompleted");

    if (hideCompleted === 'true') {
        this.toggleHideChecked = true;
    } else {
        this.toggleHideChecked = false;
    }

    this.championsChecklistData = localStorage.getItem("championsChecklistData");
    if (!this.championsChecklistData) {
      this.championsChecklistData = this.defaultData;
      this.championsChecklistData['Champion Ocean'].selected = true;
      this.selectedChallenge = 'Champion Ocean';
    } else {
      this.championsChecklistData = JSON.parse(this.championsChecklistData);
    }

    // localStorage.setItem("championsChecklistData", JSON.stringify(this.championsChecklistData));


    for (var prop in this.championsChecklistData) {
      if (this.championsChecklistData[prop].selected) {
        this.selectedChallenge = prop;
      }
    }

    console.log(this.championsChecklistData[this.selectedChallenge].data);

    this.masterList.forEach(item => {
      let duplicatedItem = JSON.parse(JSON.stringify(item));
      console.log(duplicatedItem);
      let key = item.key;
      let foundChamp = this.championsChecklistData[this.selectedChallenge].data.find(item => item.key == key);
      if (!foundChamp) {
        this.championsChecklistData[this.selectedChallenge].data.push(duplicatedItem);

        this.championsChecklistData[this.selectedChallenge].data.sort((a, b)=> {
          return a.name.localeCompare(b.name);
        })
      }
    })



    this.challengeDetails = challengeData.find(challenge => {
      return challenge.translation.name == this.selectedChallenge;
    })

    this.getScore();
    this.getNextUpgrade();



  }

  toggleHideCheckedClicked () {
    this.toggleHideChecked = !this.toggleHideChecked;


    localStorage.setItem("hideCompleted", this.toggleHideChecked ? 'true' : 'false');

  }


  selectLane(lane) {
    if (lane == this.selectedLane) {
      this.selectedLane = '';
    } else {
      this.selectedLane = lane;
    }
  }

  textChanged(event) {
    console.log(this.searchText);
  }

  selectChallenge(challenge) {
    this.selectedChallenge = challenge;


    if (!this.championsChecklistData[challenge]) {
      this.championsChecklistData[challenge] = this.defaultData[challenge];
    }


    this.masterList.forEach(item => {
      let duplicatedItem = JSON.parse(JSON.stringify(item));
      let key = item.key;
      let foundChamp = this.championsChecklistData[this.selectedChallenge].data.find(item => item.key == key);
      if (!foundChamp) {
        this.championsChecklistData[this.selectedChallenge].data.push(duplicatedItem);
        this.championsChecklistData[this.selectedChallenge].data.sort((a, b)=> {
          return a.name.localeCompare(b.name);
        })
      }
    })



    for (var prop in this.championsChecklistData) {
      if (prop == challenge) {
        this.championsChecklistData[prop].selected = true;
      } else {
        this.championsChecklistData[prop].selected = false;
      }
    }

    localStorage.setItem("championsChecklistData", JSON.stringify(this.championsChecklistData));


    this.challengeDetails = challengeData.find(challenge => {
      return challenge.translation.name == this.selectedChallenge;
    })

    this.getScore();
    this.getNextUpgrade();
  }


  getScore() {
    this.score = 0;
    this.championsChecklistData[this.selectedChallenge].data.forEach(item => {
      if (item.checked) {
        this.score++;
      }
    })
  }

  champClicked(item) {
    item.checked = !item.checked;
    localStorage.setItem("championsChecklistData", JSON.stringify(this.championsChecklistData));
    this.getScore();
    this.getNextUpgrade();
    this.lastClicked = item;
  }

  undo() {
    this.lastClicked.checked = !this.lastClicked.checked;
  }


  getNextUpgrade() {

    let thresholds = this.challengeDetails.thresholds;

    if (this.score < thresholds.IRON) {
      console.log('unranked');
      this.nextUpgrade = thresholds.IRON;
      this.rankColor = '#2e2e2e';
      this.rank = 'UNRANKED';
    } else if (this.score >= thresholds.IRON &&  this.score < thresholds.BRONZE) {
      console.log('IRON');
      this.nextUpgrade = thresholds.BRONZE;
      this.rankColor = '#cbcbcb';
      this.rank = 'IRON';
    } else if (this.score >= thresholds.BRONZE &&  this.score < thresholds.SILVER) {
      console.log('BRONZE');
      this.nextUpgrade = thresholds.SILVER;
      this.rankColor = '#ffbe7d';
      this.rank = 'BRONZE';
    } else if (this.score >= thresholds.SILVER &&  this.score < thresholds.GOLD) {
      console.log('SILVER');
      this.nextUpgrade = thresholds.GOLD;
      this.rankColor = '#cbcbcb';
      this.rank = 'SILVER';
    } else if (this.score >= thresholds.GOLD &&  this.score < thresholds.PLATINUM) {
      this.nextUpgrade = thresholds.PLATINUM;
      this.rankColor = 'gold';
      this.rank = 'GOLD';
    } else if (this.score >= thresholds.PLATINUM &&  this.score < thresholds.DIAMOND) {
      this.nextUpgrade = thresholds.DIAMOND;
      this.rankColor = '#00e6b0';
      this.rank = 'PLATINUM';
    } else if (this.score >= thresholds.DIAMOND &&  this.score < thresholds.MASTER) {
      this.nextUpgrade = thresholds.MASTER;
      this.rankColor = '#CCFFFF';
      this.rank = 'DIAMOND';
    } else if (this.score >= thresholds.MASTER) {
      this.nextUpgrade = '';
      this.rankColor = '#d37dfd';
      this.rank = 'MASTER';
    }

  }


}
