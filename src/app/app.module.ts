import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';

import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { DesktopProjectShowcaseComponent } from './desktop-project-showcase/desktop-project-showcase.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SocialsComponent } from './socials/socials.component';
import { SkillsComponent } from './skills/skills.component';
import { AboutMeSmallComponent } from './about-me-small/about-me-small.component';
import { SkillsSmallComponent } from './skills-small/skills-small.component';
import { SkillsBarComponent } from './skills-bar/skills-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    ListComponent,
    FeaturedProjectsComponent,
    DesktopProjectShowcaseComponent,
    AboutMeComponent,
    SocialsComponent,
    SkillsComponent,
    AboutMeSmallComponent,
    SkillsSmallComponent,
    SkillsBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
