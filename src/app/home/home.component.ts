import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Project {
  id: number;
  tag: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  projects: Project[] = [];

  constructor( private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
      this.projects = data;
    });
  }
}
