const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());

function runWMI(query, res) {
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
app.get('/api/cpu', (req, res) => runWMI("SELECT Name,NumberOfCores,MaxClockSpeed FROM Win32_Processor", res));

app.listen(3000, () => console.log("Backend running on port 3000"));