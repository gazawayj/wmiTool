const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());

function runQuery(query, res) {
    const command = `powershell -Command "Get-WmiObject -Query \\"${query}\\" | ConvertTo-Json"`;
    exec(command, (error, stdout) => {
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.send(stdout);
    });
}

//get CPU name, number of corse, and max clock speed
app.get('/api/cpu', (req, res) => runQuery("SELECT Name,NumberOfCores,MaxClockSpeed,LoadPercentage FROM Win32_Processor", res));
app.get('/api/memory', (req, res) => runQuery("SELECT TotalVisibleMemorySize,FreePhysicalMemory FROM Win32_OperatingSystem", res));
app.get('/api/disk', (req, res) => runQuery("SELECT VolumeName,Size,FreeSpace FROM Win32_LogicalDisk", res));
app.get('/api/sys', (req, res) => runQuery("SELECT SystemType FROM Win32_ComputerSystem", res));
app.listen(3000, () => console.log("Backend running on port 3000"));