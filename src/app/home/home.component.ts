import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  AppService
} from '../app.service';
import {
  CommonModule
} from "@angular/common";
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    AppService
  ],
})
export class HomeComponent implements OnInit {

  public placeholder = 'name#tag';
  public inputText = '';
  public regions;
  public selectedRegion = {
    name: 'NA',
    id: 'NA1'
  };
  public catchemScore;
  public nextUpgrade;

  constructor(
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.regions = this.appService.regions;
    this.selectedRegion = this.appService.selectedRegion;
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

  selectRegion(region) {
    this.selectedRegion = region;
    localStorage.setItem("selectedRegion", JSON.stringify(region));
  }

  getAccountData(name, tag) {
    this.appService.getAccount({
      name: name,
      tag: tag,
      region: this.selectedRegion.id
    }).subscribe((resp: any) => {

        localStorage.setItem("activeprofile", resp.puuid);
        this.getMastery(resp.puuid, name, tag);
      },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

  getMastery(puuid, name, tag) {
    this.appService.getMastery({
      puuid: puuid,
      region: this.selectedRegion.id
    }).subscribe((resp: any) => {

        let top150 = resp.data.slice(0, 150);
        this.catchemScore = top150[top150.length - 1].championPoints;
        this.nextUpgrade = this.getNextUpgrade(this.catchemScore);
        console.log(this.catchemScore, this.nextUpgrade);
        let currentTotal = 0;
        top150.forEach(item => {
          let pointsEarned = 0;

          if (item.championPoints >= this.nextUpgrade) {
            pointsEarned = this.nextUpgrade;

          } else {
            pointsEarned = parseInt(item.championPoints);
          }
          currentTotal = currentTotal + pointsEarned;
        })
        if (!this.appService.profiles[resp.id]) {
          this.appService.profiles[resp.id] = {
            name: name,
            tag: tag,
            region: this.selectedRegion.id,
            data: top150,
            dateStarted: new Date(),
            startingEXP: currentTotal,
          }
          localStorage.setItem("profiles", JSON.stringify(this.appService.profiles));
        }
        this.appService.activeProfileInfo = this.appService.profiles[resp.id];
        this.router.navigate(['/mastery']);
      },
      (resp) => {
        const error = resp.error;
        this.placeholder = error.error.message;
        this.inputText = '';

    })
  }

  getNextUpgrade(score) {
    if (score < 100) {
      return 100;
    } else if (score >= 100 && score < 500) {
      return 500;
    } else if (score >= 500 && score < 1000) {
      return 1000;
    } else if (score >= 1000 && score < 5000) {
      return 5000;
    } else if (score >= 5000 && score < 10000) {
      return 10000;
    } else if (score >= 10000 && score < 50000) {
      return 50000;
    } else if (score >= 50000 && score < 100000) {
      return 100000;
    } else {
      return null;
    }
  }

}