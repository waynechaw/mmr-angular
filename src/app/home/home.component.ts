import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService }  from '../app.service';
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbDropdownModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [AppService, Router],
})
export class HomeComponent  implements OnInit {

  public placeholder = 'name#tag';
  public inputText = '';
  public regions;
  public selectedRegion = {
    name: 'NA',
    id: 'NA1'
  };

  constructor(
    private  appService: AppService,
    private router: Router
  ) {
  }

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
        this.getMasteryData(parsed[0], parsed[1]);
    }

  }

  selectRegion(region) {
    this.selectedRegion = region;
    localStorage.setItem("selectedRegion", JSON.stringify(region));
  }

  getMasteryData(name, tag) {
    this.appService.getMastery({
      name: name, 
      tag: tag, 
      region: this.selectedRegion.id
    }).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem("activeprofile", resp.id);
      this.router.navigate(['mastery']);
    },
    (resp) => {
      const error = resp.error;
      this.placeholder = error.error.message;
      this.inputText = '';

    })
  }

}
