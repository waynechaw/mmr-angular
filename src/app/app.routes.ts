import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MasteryComponent} from './mastery/mastery.component';
import {ChecklistComponent} from './checklist/checklist.component';
import {CompareComponent} from './compare/compare.component';
import {LeaderComponent} from './leader/leader.component';
export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'mastery', component: MasteryComponent },
	{ path: 'checklist', component: ChecklistComponent },
	{ path: 'compare', component: CompareComponent },
	{ path: 'leader', component: LeaderComponent },
];