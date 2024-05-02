import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {


  public regions = [
    {
      name: 'BR',
      id: 'BR1'
    },
    {
      name: 'EUNE',
      id: 'EUN1'
    },
    {
      name: 'EUW',
      id: 'EUW1'
    },
    {
      name: 'KR',
      id: 'KR'
    },
    {
      name: 'LAN',
      id: 'LA1'
    },
    {
      name: 'LAS',
      id: 'LA2'
    },
    {
      name: 'RU',
      id: 'RU'
    },
    {
      name: 'NA',
      id: 'NA1'
    },
    {
      name: 'OCE',
      id: 'OC1'
    },
    {
      name: 'TR',
      id: 'TR1'
    },
    {
      name: 'JP',
      id: 'JP1'
    },
    {
      name: 'VN',
      id: 'VN2'
    },
    {
      name: 'TW',
      id: 'TW2'
    },
    {
      name: 'TH',
      id: 'TH2'
    },
    {
      name: 'SG',
      id: 'SG2'
    },
    {
      name: 'PH',
      id: 'PH2'
    }
  ];

  public selectedRegion;

  public profiles: any;

  public activeProfileID;

  public activeProfileInfo;


  constructor(private http: HttpClient) { 
    let selectedRegion = localStorage.getItem("selectedRegion");
    if (!selectedRegion) {
        this.selectedRegion = {
          name: 'NA',
          id: 'NA1'
        };
    } else {
        try {
          this.selectedRegion = JSON.parse(selectedRegion);
        } catch(error) {
          let fullRegionData = this.regions.find(region => {
            return region.name == selectedRegion;
          })
          this.selectedRegion = fullRegionData;
          localStorage.setItem("selectedRegion", JSON.stringify(this.selectedRegion));
        }
    }


    let profiles = localStorage.getItem("profiles");
    if (!profiles) {
        this.profiles = {};
    } else {
        this.profiles = JSON.parse(profiles);
    }

    let activeProfile = localStorage.getItem("activeprofile");

    if (activeProfile && activeProfile != 'undefined' && this.profiles[activeProfile]) {
      this.activeProfileID = activeProfile;
        this.activeProfileInfo = this.profiles[activeProfile];
    }
  }

  getAccount(body) {
    return this.http.post('/account', body);
  }
  getMastery(body) {
    return this.http.post('/mastery', body);
  }
  getMasteryChallengeData(body) {
    return this.http.post('/mastery-challenges', body);
  }
}