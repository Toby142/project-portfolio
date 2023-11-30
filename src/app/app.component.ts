import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { fadeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'project-portofolio';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }, 50);
      }
    });
  }

}
