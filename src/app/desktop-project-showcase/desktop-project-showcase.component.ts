import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  images: Images[];
  positionX: number;
  positionY: number;
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

  project: Project[] = [];
  private containerWidth = 0;
  private containerHeight = 0;

  private isDragging = false;
  private currentCardIndex = -1;
  private offsetX = 0;
  private offsetY = 0;
  private initialOffsetX = 0;
  private initialOffsetY = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.containerWidth = document.getElementsByClassName('project-board-container')[0].clientWidth;
    this.containerHeight = document.getElementsByClassName('project-board-container')[0].clientHeight;

    this.http.get<Project[]>('/assets/projectList.json').subscribe(data => {
      this.project = data.map(p => ({ ...p, positionX: this.getRandomPosition(), positionY: this.getRandomPosition() }));
    });
  }

  onMouseDown(event: MouseEvent, index: number) {
    this.isDragging = true;
    this.currentCardIndex = index;
    const cardRect = (event.target as HTMLElement).getBoundingClientRect();
    this.offsetX = event.clientX - cardRect.left;
    this.offsetY = event.clientY - cardRect.top;
    this.initialOffsetX = this.project[index].positionX - this.offsetX;
    this.initialOffsetY = this.project[index].positionY - this.offsetY;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.currentCardIndex !== -1) {
      let newX = event.clientX - this.offsetX + this.initialOffsetX;
      let newY = event.clientY - this.offsetY + this.initialOffsetY;

      newX = Math.max(0, Math.min(newX, this.containerWidth - 200)); // 200 is the card width
      newY = Math.max(0, Math.min(newY, this.containerHeight - 200)); // 200 is the card height

      this.project[this.currentCardIndex].positionX = newX;
      this.project[this.currentCardIndex].positionY = newY;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.currentCardIndex = -1;
    }
  }

  getRandomPosition(): number {
    return Math.floor(Math.random() * (this.containerWidth - 100)); // Adjust this value based on card width
  }
}
