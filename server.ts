import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

// Create Gemini Client with exact SDK guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. AI FAKE ACCOUNT DETECTOR ENDPOINT
  app.post('/api/detect-fake-account', async (req, res) => {
    try {
      const { name, email, college } = req.body;

      if (!name || !email || !college) {
        return res.status(400).json({
          error: "Missing required inputs name, email, or college."
        });
      }

      // Query Gemini 3.5 Flash for rapid, structured validation
      const prompt = `You are an academic authentication security parser.
Determine whether the following registration registration is a REAL, plausible student/faculty account, or a FAKE/SPAM/JUNK account:

Name: ${name}
Email: ${email}
College/University: ${college}

Analyze strictly:
1. Names: Detect random string inputs (e.g., 'asdf', 'dfgfh'), symbols, numbers, or placeholders like 'test test', 'none', 'dummy'. Plausible human names (domestic or international) are classified as REAL.
2. Emails: Detect random character patterns (e.g., 'a123ksd023@gmail.com'), temporary/disposable domain names, or spam structures.
3. College/University: Detect nonsense strings ('asdf university', 'no', 'none', 'unknown', 'fake school', random letters). Actual colleges or real-sounding institutions should be classified as REAL.

Respond in strict JSON format.`;

      const geminiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are an automated academic validation engine. Determine isReal (boolean), confidenceScore (integer 0-100), and reason (string explanation). Be objective and friendly.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isReal: {
                type: Type.BOOLEAN,
                description: "True if the registration parameters look real and legitimate. False if they are placeholders, spam, or gibberish."
              },
              confidenceScore: {
                type: Type.INTEGER,
                description: "Confidence level of analysis from 0 to 100."
              },
              reason: {
                type: Type.STRING,
                description: "A professional, human-understandable explanation or details about the registration compliance."
              }
            },
            required: ["isReal", "confidenceScore", "reason"]
          }
        }
      });

      const responseText = geminiResponse.text;
      if (!responseText) {
        throw new Error("No response string from Gemini.");
      }

      const parsedResult = JSON.parse(responseText.trim());
      res.json(parsedResult);
    } catch (err: any) {
      console.error("Gemini Fake Account Detection Error:", err);
      // Fail-proof local fallback if API key is missing or invalid
      const nameLower = (req.body.name || "").toLowerCase().trim();
      const emailLower = (req.body.email || "").toLowerCase().trim();
      const collegeLower = (req.body.college || "").toLowerCase().trim();

      const dummyKeywords = ["test", "dummy", "fake", "admin", "none", "nobody", "asd", "asdf", "qwert", "zxcv", "xyz", "123", "placeholder", "mock", "guest", "abc", "john doe"];
      const isGibberish = (str: string) => /^[bcdfghjklmnpqrstvwxyz]{4,}/i.test(str) || str.length < 3 || dummyKeywords.some(kw => str === kw || str.includes(kw + " ") || str.includes(" " + kw));
      const hasDummyEmail = dummyKeywords.some(kw => emailLower.includes(kw)) || emailLower.includes("example") || emailLower.includes("tempmail") || emailLower.endsWith("@mail.com");
      
      const isFake = isGibberish(nameLower) || isGibberish(collegeLower) || hasDummyEmail;

      res.json({
        isReal: !isFake,
        confidenceScore: 90,
        reason: isFake 
          ? "Academic registration security firewall: Identifiers flagged as placeholders, dummy entities, or test structures." 
          : "Server-side fallback evaluation complete: Registration details compiled securely."
      });
    }
  });

  // Serve Vite in development, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
