import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  lastUrl: string | null = null;

  constructor(
    private appState: AppStateService,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.platform.ready().then(async () => {
      const url = await this.appState.loadLastVisitedUrl();
      this.lastUrl = url;

      // 🔁 Redirect tas bort här — inget navigateByUrl!

      // 🔄 Spara URL efter varje navigation
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.appState.saveLastVisitedUrl(event.urlAfterRedirects);
        }
      });
    });
  }
}
