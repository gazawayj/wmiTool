# wmiTool
wmiTool is a lightweight learning project to explore **Windows Management Instrumentation (WMI)** and full-stack development. It collects system information from a server backend and displays it through a modern Angular frontend.

---

## Live Demo
https://gazawayj.github.io/wmiTool/
>> Hosted on GitHub Pages (frontend) and AWS EC2 (backend):

---

## Features

### Backend
- Node.js server running on AWS EC2
- Pulls system information using WMI (Windows Management Instrumentation)
- Provides a REST API for CPU and other system metrics

### Frontend
- Angular application displaying server hardware details in a clean dashboard
- Fully static build deployable to GitHub Pages
- Consumes backend API for live server data

---

## Technology Stack

| Layer       | Technology |
|------------|------------|
| Frontend    | Angular 17+, TypeScript, RxJS |
| Backend     | Node.js, Express |
| Hosting     | Frontend → GitHub Pages, Backend → AWS EC2 |

---

## Notes

Backend currently reports AWS EC2 server hardware, not local machine stats.

---

## Future Improvements

Display more system metrics (memory, disk, network usage)

Improve frontend UI/UX with better styling and visualizations

