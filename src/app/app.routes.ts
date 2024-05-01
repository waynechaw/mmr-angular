import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MasteryComponent} from './mastery/mastery.component';
import {CatchComponent} from './catch/catch.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'mastery', component: MasteryComponent },
	{ path: 'catch', component: CatchComponent },
];