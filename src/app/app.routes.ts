import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MasteryComponent} from './mastery/mastery.component';
import {ChecklistComponent} from './checklist/checklist.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'mastery', component: MasteryComponent },
	{ path: 'checklist', component: ChecklistComponent },
];