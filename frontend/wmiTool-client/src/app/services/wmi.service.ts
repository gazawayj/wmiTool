import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  backendUrl = 'http://ec2-16-58-21-42.us-east-2.compute.amazonaws.com:3000';

  constructor(private http: HttpClient) { }

  getCPU() { return this.http.get(`${this.backendUrl}/api/cpu`); }

  getMem() { return this.http.get(`${this.backendUrl}/api/memory`); }

  getDisk() { return this.http.get(`${this.backendUrl}/api/disk`); }

  getSys() { return this.http.get(`${this.backendUrl}/api/sys`); }

  bytesToGiB(bytes: number) {
    if (bytes === 0) return 0;
    const gibibyte = Math.pow(1024, 3); // 1024 * 1024 * 1024
    return bytes / gibibyte;
  }
}