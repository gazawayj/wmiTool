import { Component, OnInit, inject, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SystemService } from '../../services/system.service';
import { forkJoin } from 'rxjs';

/**
 * DashboardComponent
 *
 * Displays server hardware information from the backend API
 * and client hardware information collected from browser APIs.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  /* ---------------- Server Hardware ---------------- */

  cpu: any;
  mem: any;
  disk: any;
  sys: any;

  /* ---------------- Client Hardware ---------------- */

  clientPlatform: string | undefined;
  clientCpuThreads: number | string | undefined;
  clientMemory: string | undefined;
  clientScreen: string | undefined;
  clientUserAgent: string | undefined;

  lastUpdate!: Date;

  private sysServ = inject(SystemService);

  /**
   * Constructor used for platform detection.
   *
   * @param platformId Angular platform identifier
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Angular lifecycle hook executed on component initialization.
   *
   * Retrieves server hardware information and client hardware
   * information when running inside a browser environment.
   */
  ngOnInit(): void {

    forkJoin({
      cpu: this.sysServ.getCPU(),
      mem: this.sysServ.getMem(),
      disk: this.sysServ.getDisk(),
      sys: this.sysServ.getSys()
    }).subscribe({
      next: data => {

        /* Server hardware */
        this.cpu = data.cpu;
        this.mem = data.mem;
        this.disk = data.disk;
        this.sys = data.sys;

        this.lastUpdate = new Date();

        /* Client hardware */
        if (isPlatformBrowser(this.platformId)) {

          const client = this.sysServ.getClientInfo();

          this.clientPlatform = client.platform;
          this.clientCpuThreads = client.cpuThreads;
          this.clientMemory = client.deviceMemory;
          this.clientScreen = client.screenResolution;
          this.clientUserAgent = client.userAgent;
        }
      },
      error: err => {
        console.error('Failed to fetch system data:', err);
      }
    });
  }
}