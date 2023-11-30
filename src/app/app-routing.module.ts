import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ListComponent } from './list/list.component';
import { AboutMeComponent } from './about-me/about-me.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialsComponent } from './socials/socials.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'list', component: ListComponent },
  { path: 'socials', component: SocialsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
