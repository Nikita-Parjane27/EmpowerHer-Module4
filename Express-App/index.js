const express = require("express");
const os = require("os");
const dns = require("dns");
const readFileData = require("./read");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileData();
    res.send(data);
  } catch (error) {
    res.status(500).send("Unable to read file");
  }
});

app.get("/systemdetails", (req, res) => {
  const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);

  res.json({
    platform: os.platform(),
    totalMemory: `${totalMemory} GB`,
    freeMemory: `${freeMemory} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length   
  });
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: "DNS lookup failed" });
    } else {
      res.json({
        hostname: "masaischool.com",
        addresses: addresses
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
