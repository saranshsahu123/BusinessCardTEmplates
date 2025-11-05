import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Hugging Face API Route



app.post("/api/generate-design", async (req, res) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: req.body.prompt || "professional modern business card design",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error generating design:", error);
    res.status(500).json({ error: "Failed to generate design" });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
