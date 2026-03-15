import { 
  Component, 
  OnInit, 
  OnDestroy, 
  inject, 
  Inject, 
  PLATFORM_ID, 
  ViewEncapsulation, 
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SystemService } from '../services/system.service';
import { forkJoin, timer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  /* Server hardware */
  cpu: any;
  mem: any;
  disk: any;
  sys: any;

  /* Client hardware */
  clientPlatform: string | undefined;
  clientCpuThreads: number | string | undefined;
  clientMemory: string | undefined;
  clientScreen: string | undefined;
  clientUserAgent: string | undefined;

  lastUpdate!: Date;

  private sysServ = inject(SystemService);
  private changeDetect = inject(ChangeDetectorRef);
  private refreshSub?: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      // Get Client Info
      const client = this.sysServ.getClientInfo();
      this.clientPlatform = client.platform;
      this.clientCpuThreads = client.cpuThreads;
      this.clientMemory = client.deviceMemory;
      this.clientScreen = client.screenResolution;
      this.clientUserAgent = client.userAgent;

      // Start the refresh timer
      this.refreshSub = timer(0, 5000)
        .pipe(
          switchMap(() => forkJoin({
            cpu: this.sysServ.getCPU(),
            mem: this.sysServ.getMem(),
            disk: this.sysServ.getDisk(),
            sys: this.sysServ.getSys()
          }))
        )
        .subscribe({
          next: (data: any) => {
            this.cpu = data.cpu;
            this.sys = data.sys;

            if (data.mem) {
              this.mem = data.mem;
              this.mem.TotalVisibleMemorySize = Number(this.sysServ.bytesToFormat(data.mem.TotalVisibleMemorySize).toPrecision(3));
              this.mem.FreePhysicalMemory = Number(this.sysServ.bytesToFormat(data.mem.FreePhysicalMemory).toPrecision(3));
            }

            if (data.disk) {
              this.disk = data.disk;
              this.disk.Size = Number(this.sysServ.bytesToFormat(data.disk.Size).toPrecision(3));
              this.disk.FreeSpace = Number(this.sysServ.bytesToFormat(data.disk.FreeSpace).toPrecision(3));
            }

            this.lastUpdate = new Date();

            // Force Angular to update the UI
            this.changeDetect.markForCheck();
          },
          error: err => console.error('Data fetch failed:', err)
        });
    }
  }

  ngOnDestroy(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
