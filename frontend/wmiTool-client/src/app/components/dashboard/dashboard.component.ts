import { Component, OnInit, inject, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SystemService } from '../../services/wmi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  cpu: any;
  mem: any;
  disk: any;
  sys: any;
  lastUpdate!: Date;

  private sysServ = inject(SystemService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    forkJoin({
      cpu: this.sysServ.getCPU(),
      mem: this.sysServ.getMem(),
      disk: this.sysServ.getDisk(),
      sys: this.sysServ.getSys()
    }).subscribe({
      next: data => {
        this.cpu = data.cpu;
        this.mem = data.mem;
        this.disk = data.disk;
        this.sys = data.sys;
        this.lastUpdate = new Date();
      },
      error: err => {
        console.error('Failed to fetch system data:', err);
      }
    });
  }
}