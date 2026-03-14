import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service responsible for retrieving system information
 * from both the backend server and the client browser.
 */
@Injectable({
  providedIn: 'root'
})
export class SystemService {

  backendUrl = 'http://ec2-16-58-21-42.us-east-2.compute.amazonaws.com:3000';

  /**
   * Constructor for SystemService.
   * @param http Angular HttpClient used for backend requests.
   */
  constructor(private http: HttpClient) {}

  /* ------------------------------------------------------------------
     SERVER HARDWARE (EC2 / Backend)
  ------------------------------------------------------------------ */

  /**
   * Retrieves CPU information from the backend server.
   * @returns Observable containing CPU details.
   */
  getCPU(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/cpu`);
  }

  /**
   * Retrieves memory information from the backend server.
   * @returns Observable containing memory details.
   */
  getMem(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/memory`);
  }

  /**
   * Retrieves disk information from the backend server.
   * @returns Observable containing disk details.
   */
  getDisk(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/disk`);
  }

  /**
   * Retrieves system information from the backend server.
   * @returns Observable containing system details.
   */
  getSys(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/sys`);
  }

  /* ------------------------------------------------------------------
     CLIENT HARDWARE (Browser)
  ------------------------------------------------------------------ */

  /**
   * Collects hardware information available from the browser.
   * Browser security limits direct access to detailed hardware data.
   *
   * @returns Object containing client device information.
   */
  getClientInfo() {
    const deviceMemory = (navigator as any).deviceMemory;

    return {
      platform: navigator.platform || 'Unknown',
      userAgent: navigator.userAgent || 'Unknown',
      cpuThreads: navigator.hardwareConcurrency || 'Unknown',
      deviceMemory: deviceMemory ? `${deviceMemory} GB` : 'Unknown',
      screenResolution: `${screen.width} x ${screen.height}`
    };
  }

  /* ------------------------------------------------------------------
     UTILITIES
  ------------------------------------------------------------------ */

  /**
   * Converts bytes to gibibytes (GiB).
   *
   * @param bytes Number of bytes.
   * @returns Value converted to GiB.
   */
  bytesToGiB(bytes: number): number {
    if (bytes <= 1) return bytes;
    
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    let i = 0;
    let size = bytes;

    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }

    return size;
  }
}