# wmiTool
wmiTool is a lightweight learning project to explore **Windows Management Instrumentation (WMI)** and full-stack development. It collects system information from a server backend and displays it through a modern Angular frontend.

---

## Live Demo
https://gazawayj.github.io/wmiTool/
> Hosted on GitHub Pages (frontend) and AWS EC2 (backend)

---

## Features

### Backend
- Node.js server running on AWS EC2
- Pulls system information using WMI (Windows Management Instrumentation)
- Provides a REST API for CPU and other system metrics
- Served securely through IIS reverse proxy with HTTPS

### Frontend
- Angular application displaying server hardware details in a clean dashboard
- Build deployable to GitHub Pages
- Consumes backend API for live server data over HTTPS
- Also presents client browser info, as remote WMI is not permitted through a browser

---

## Technology Stack

| Layer       | Technology |
|------------|------------|
| Frontend    | Angular, TypeScript, RxJS |
| Backend     | Node.js, Express |
| Server Proxy | IIS, Application Request Routing (ARR), URL Rewrite |
| Hosting     | Frontend → GitHub Pages, Backend → AWS EC2 |

---

## Notes

Backend reports AWS EC2 server hardware, not local machine stats.

I use Linux as my main driver, so a windows server was the more practical
way to practice WMI.

To allow the GitHub Pages frontend (HTTPS) to communicate with the backend,
I configured IIS on the EC2 Windows server with Application Request Routing (ARR)
and URL Rewrite to act as an HTTPS reverse proxy. This facilitates the use of both 
http and https calls within the EC2 server app. This prevents mixed-content 
blocking and allows secure API access.

---

## Future Improvements

Display more server system metrics (memory, disk, network usage)

Improve frontend UI/UX with better styling and visualizations

Maybe make a Windows service to feed into client.