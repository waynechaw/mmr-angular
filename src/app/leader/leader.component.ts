import { Component, OnInit } from '@angular/core';
import { AppService }  from '../app.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import challengeData from '../data/challengeData.json';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import playersData from '../data/leader.json';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-leader',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbTooltipModule, FormsModule],
  templateUrl: './leader.component.html',
  styleUrl: './leader.component.scss',
  providers: [
    AppService
  ],
})
export class LeaderComponent {
  public inputText = '';

  public regions;

  public selectedRegion = {
    name: 'Global',
    id: 'global'
  };

  public playersList;

  constructor(private  appService: AppService,) { 
  }


  ngOnInit() {
    this.appService.regions.unshift({
      name: 'Global',
      id: 'global'
    });
    this.regions = this.appService.regions;
    console.log(this.regions);

    playersData.sort((a, b) => b.score - a.score);
    this.playersList = playersData;
  }

  selectRegion(region) {
    this.selectedRegion = region;
    if (region.id == 'global') {
      this.playersList = playersData;
    } else {
      this.playersList = playersData.filter(item => item.region == region.id)
    }
  }

}
