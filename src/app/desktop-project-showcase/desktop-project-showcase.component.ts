import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  description: string;
  images: Images[];
}

interface Images {
  url: string;
  description: string;
}

@Component({
  selector: 'app-desktop-project-showcase',
  templateUrl: './desktop-project-showcase.component.html',
  styleUrls: ['./desktop-project-showcase.component.css']
})
export class DesktopProjectShowcaseComponent {

  project: Project[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
      this.project = data;
      console.log(this.project);
    });
  }

}
