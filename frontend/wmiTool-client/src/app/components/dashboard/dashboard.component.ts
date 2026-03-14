import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemService } from '../../services/wmi.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],  // needed for *ngIf
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cpu: any;

  private sys = inject(SystemService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.sys.getCPU().subscribe(data => this.cpu = data);
  }
}