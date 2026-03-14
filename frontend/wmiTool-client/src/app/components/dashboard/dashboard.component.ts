import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemService } from '../../services/wmi.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cpu: any;
  mem: any;
  disk: any;
  sys: any;

  private sysServ = inject(SystemService);

  ngOnInit() {
    this.sysServ.getCPU().subscribe(data => this.cpu = data);
    this.sysServ.getMem().subscribe(data => this.mem = data);
    this.sysServ.getDisk().subscribe(data => this.disk = data);
    this.sysServ.getSys().subscribe(data => this.sys = data);
  }
}
