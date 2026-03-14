import { Component, OnInit, OnDestroy, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SystemService } from '../../services/wmi.service';
import { interval, Subscription, forkJoin } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cpu: any;
  mem: any;
  disk: any;
  sys: any;
  lastUpdate!: Date;

  private sysServ = inject(SystemService);
  private refreshSub!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only run polling in the browser (SSR-safe)
    //if (isPlatformBrowser(this.platformId)) {
      this.refreshSub = interval(2000)
        .pipe(
          startWith(0), // fetch immediately
          switchMap(() =>
            forkJoin({
              cpu: this.sysServ.getCPU(),
              mem: this.sysServ.getMem(),
              disk: this.sysServ.getDisk(),
              sys: this.sysServ.getSys()
            })
          )
        )
        .subscribe(data => {
          this.cpu = data.cpu;
          this.mem = data.mem;
          this.disk = data.disk;
          this.sys = data.sys;
          this.lastUpdate = new Date();
        });
    //}
  }

  ngOnDestroy() {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }
}