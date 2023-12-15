import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Project {
  id: number;
  title: string;
  description: string;
  about: string;
  images: Images[];
}
interface Images {
  name: string;
  url: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  projects: Project[] = [];
  @Input() showNav: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.filterProjects('')
  }

  filterProjects(searchQuery: string): void {
    if (searchQuery.trim() === '') {
      this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
        this.projects = data;
      });
    } else {
      this.projects = this.projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }


}
