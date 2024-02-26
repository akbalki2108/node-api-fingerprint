// Instead of const fetch = require('node-fetch');
import('node-fetch').then(fetch => {
  // Your code that uses fetch goes here
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  // Endpoint to initiate fingerprint capturing on the ESP32
  app.post("/start-capture", async (req, res) => {
      // Assuming you have the IP address of your ESP32
      const esp32IP = '192.168.29.162';
      try {
          const response = await fetch(`http://${esp32IP}/capture-fingerprint`);
          const fingerprint = await response.json();
          // Once the fingerprint is captured, you can send it to the API or process it as needed
          console.log("Fingerprint captured:", fingerprint);
          res.json(fingerprint);
      } catch (error) {
          console.error("Error capturing fingerprint:", error);
          res.status(500).json({ error: "Error capturing fingerprint" });
      }
  });

  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
});
