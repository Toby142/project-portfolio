import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  description: string;
  about: string;
  used: string[];
  other: string;
  links: Link[];
  images: Images[];
}

interface Link {
  name: string;
  url: string;
}

interface Images {
  name: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  projectId: number | undefined;
  project: Project | undefined;
  projects: Project[] = [];

  projectContentOpen = true;
  projectPicturesOpen = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.getProjectId();
  }

  getProjectId() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.getProject(this.projectId);
    });
  }

  getProject(projectId: number): void {
    this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
      const foundProject = data.find(project => project.id === projectId);
      if (foundProject) {
        this.project = foundProject;
      } else {
        // error handling
        console.error('Project not found:', projectId);
      }
    });
  }
  
  toggleOpen() {
    if (this.projectContentOpen) {
      this.projectContentOpen = false;
      this.projectPicturesOpen = true;
    } else if (this.projectPicturesOpen) {
      this.projectContentOpen = true;
      this.projectPicturesOpen = false;
    }
  }
  
  logBoth() {
    console.log(this.projectContentOpen, this.projectPicturesOpen);
  }
}
