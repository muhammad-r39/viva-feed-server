const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow requests from any origin
app.use(express.json()); // Parse JSON bodies

app.get("/api/viva-feed", async (req, res) => {
  try {
    console.log("Received request to fetch Viva Engage feed");

    const authHeader = req.headers.authorization;
    const userToken = authHeader?.split(" ")[1];

    if (!userToken) {
      return res.status(400).json({ error: "Missing user token" });
    }

    const vivaEngageUrl = "https://api.yammer.com/api/v1/messages.json";

    const feedResponse = await axios.get(vivaEngageUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log("Viva Engage feed retrieved successfully");
    res.status(200).json(feedResponse.data);
  } catch (error) {
    console.error("Full error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch Viva Engage feed",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
