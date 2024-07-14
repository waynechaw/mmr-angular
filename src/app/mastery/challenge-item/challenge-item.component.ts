import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import challengeData from '../../data/challengeData.json';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CommonModule
} from "@angular/common";

@Component({
  selector: 'challenge-item',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './challenge-item.component.html',
  styleUrl: './challenge-item.component.scss'
})
export class ChallengeItemComponent  implements OnInit  {

  @Input() userChallengeData;

  @Output() challengeClickedEvent = new EventEmitter<boolean>();

  public challengeDetails;
  public nextUpgrade;
  public rankColor;


  ngOnInit() {
    this.challengeDetails = challengeData.find(item => {
      return item.id == this.userChallengeData.challengeId;
    });

    this.getNextUpgrade(this.userChallengeData.level);
  }

  challengeClicked() {
    this.userChallengeData.selected = !this.userChallengeData.selected;
    this.challengeClickedEvent.emit(this.challengeDetails);
  }


  getNextUpgrade(level) {
    if (level == 'NONE') {
      this.nextUpgrade = this.challengeDetails.thresholds.IRON;
      this.rankColor = '#2e2e2e';
    } else if (level == 'IRON') {
      this.nextUpgrade = this.challengeDetails.thresholds.BRONZE;
      this.rankColor = '#cbcbcb';
    } else if (level == 'BRONZE') {
      this.nextUpgrade = this.challengeDetails.thresholds.SILVER;
      this.rankColor = '#ffbe7d';
    } else if (level == 'SILVER') {
      this.nextUpgrade = this.challengeDetails.thresholds.GOLD;
      this.rankColor = '#cbcbcb';
    } else if (level == 'GOLD') {
      this.nextUpgrade = this.challengeDetails.thresholds.PLATINUM;
      this.rankColor = 'gold';
    } else if (level == 'PLATINUM') {
      this.nextUpgrade = this.challengeDetails.thresholds.DIAMOND;
      this.rankColor = '#00e6b0';
    } else if (level == 'DIAMOND') {
      this.nextUpgrade = this.challengeDetails.thresholds.MASTER;
      this.rankColor = '#CCFFFF';
    } else if (level == 'MASTER') {
      this.nextUpgrade = '';
      this.rankColor = '#d37dfd';
    }
  }


}
