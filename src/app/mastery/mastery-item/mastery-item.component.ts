import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'mastery-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mastery-item.component.html',
  styleUrl: './mastery-item.component.scss'
})
export class MasteryItemComponent implements OnInit  {

  @Input() item;
  @Input() catchemAllMode;
  @Input() catchNextUpgrade;
  public masteryColor;
  public progressPercent;
  public progressPercentCatchMode;
  public pointsRequired;
  public tokenColor;
  ngOnInit() {
    if (this.item.championLevel == 1) {
      this.masteryColor = '#8d8d8d';
    } else if (this.item.championLevel == 2) {
      this.masteryColor = '#d7c0c0';
    } else if (this.item.championLevel == 3) {
      this.masteryColor = '#ffd3d3';
    } else if (this.item.championLevel == 4) {
      this.masteryColor = '#fff7b5';
    } else if (this.item.championLevel == 5) {
      this.masteryColor = '#b5ffe4';
      this.tokenColor = '#f4b5ff';
    } else if (this.item.championLevel == 6) {
      this.masteryColor = '#f4b5ff';
      this.tokenColor = 'cyan';
    } else if (this.item.championLevel == 7) {
      this.masteryColor = 'cyan';
    }

    if (this.item.championLevel < 5) {
      this.pointsRequired = this.item.championPointsUntilNextLevel + this.item.championPointsSinceLastLevel;
      this.progressPercent = (this.item.championPointsSinceLastLevel / this.pointsRequired  * 100) + '%';
    }
    this.progressPercentCatchMode = (this.item.championPoints / this.catchNextUpgrade  * 100) + '%';
  }

}