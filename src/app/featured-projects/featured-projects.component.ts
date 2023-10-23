import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  images: Images[];
}

interface Images {
  url: string;
  description: string;
}

@Component({
  selector: 'app-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css']
})
export class FeaturedProjectsComponent {

  project: Project[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
      this.project = data.slice(0, 3);
      console.log(this.project);
    });

  }

}
