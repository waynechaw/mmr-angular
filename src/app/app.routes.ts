import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MasteryComponent} from './mastery/mastery.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'mastery', component: MasteryComponent },
];