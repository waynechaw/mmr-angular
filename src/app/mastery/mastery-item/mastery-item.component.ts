import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() lastPlayed;
  @Output() championClickedEvent = new EventEmitter<boolean>();
  public masteryColor;
  public progressPercent;
  public progressPercentCatchMode;
  public pointsRequired;
  public tokenColor = 'gold';
  public requiredGrades;
  ngOnInit() {

    let gradeValues = {
      S: 4,
      A: 3,
      B: 2,
      C: 1,
      D: 0
    }



    let requiredGrades = this.item.nextSeasonMilestone.requireGradeCounts;


    let requiredGradesArray: any[] = [];

    for (let grade in requiredGrades) {
      let count = requiredGrades[grade];

      for (let i = 0; i < count; i++) {
        requiredGradesArray.push({
          completed: false,
          grade: grade.charAt(0),
          index: i,
          gradeValue: gradeValues[grade.charAt(0)]
        });
      }
    }

    this.requiredGrades = requiredGradesArray;


    let completedGrades = 0;



    let earnedGrades = this.item.milestoneGrades || [];

    earnedGrades.forEach(grade => {
      let gradeValue = gradeValues[grade.charAt(0)];
      this.requiredGrades.forEach(requiredGrade => {
        if (gradeValue >= requiredGrade.gradeValue && (!requiredGrade.completed)) {
          requiredGrade.completed = true;
          completedGrades++;
          gradeValue = 0;
        }
      })
    })

    this.item.completedGrades = completedGrades;






    if (this.item.championLevel == 1) {
      this.masteryColor = '#8d8d8d';
      this.pointsRequired = 1800;
    } else if (this.item.championLevel == 2) {
      this.masteryColor = '#d7c0c0';
      this.pointsRequired = 4200;
    } else if (this.item.championLevel == 3) {
      this.masteryColor = '#ffd3d3';
      this.pointsRequired = 6600;
    } else if (this.item.championLevel == 4) {
      this.masteryColor = '#fff7b5';
      this.pointsRequired = 9000;
    } else if (this.item.championLevel == 5) {
      this.masteryColor = '#b5ffe4';
      this.tokenColor = '#f4b5ff';
      this.pointsRequired = 10000;
    } else if (this.item.championLevel == 6) {
      this.masteryColor = '#f4b5ff';
      this.tokenColor = 'cyan';
      this.pointsRequired = 11000;
    } else if (this.item.championLevel == 7) {
      this.masteryColor = 'cyan';
      this.pointsRequired = 11000;
    } else if (this.item.championLevel == 8) {
      this.masteryColor = 'cyan';
      this.pointsRequired = 11000;
    } else if (this.item.championLevel == 9) {
      this.masteryColor = 'cyan';
      this.pointsRequired = 11000;
    } else if (this.item.championLevel >= 10) {
      this.masteryColor = 'gold';
      this.pointsRequired = 11000;
    }


    if (this.item.championPointsUntilNextLevel > 11000) {
      this.pointsRequired = this.item.championPoints + this.item.championPointsUntilNextLevel;
      this.item.championPointsSinceLastLevel = this.item.championPoints;
    }

    this.progressPercent = (this.item.championPointsSinceLastLevel / this.pointsRequired  * 100);

    if (this.progressPercent > 100) {
      this.progressPercent = 100;
    }
    this.progressPercent = this.progressPercent + '%';


    this.progressPercentCatchMode = (this.item.championPoints / this.catchNextUpgrade  * 100) + '%';

  }


  toggleFocus() {
    this.item.focus = !this.item.focus;
    this.championClickedEvent.emit(true);
  }


}