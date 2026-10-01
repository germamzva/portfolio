import puppeteer from "puppeteer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const screenshotImg = async (link, projectId, userId) => {
  try {
    const viewPort = {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    };

    // uploads/projects directory
    // i want to save the image into /backend/uploads/project
    const uploadFolder = path.join(__dirname, "../../uploads/projects");

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadFolder, {
      recursive: true,
    });

    // Final image path
    const projectPath = path.join(uploadFolder, `${projectId}-${userId}.png`);

    // Delete old screenshot if it exists
    if (fs.existsSync(projectPath)) {
      fs.unlinkSync(projectPath);
    }

    const browser = await puppeteer.launch({ headless: true });

    try {
      const page = await browser.newPage();

      await page.setViewport(viewPort);

      await page.goto(link, {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });

      // Screenshot as buffer
      const screenshot = await page.screenshot(projectPath, {
        fullPage: false,
      });

      console.log(projectPath);

      // Convert to WebP
      await sharp(screenshot).webp({ quality: 75 }).toFile(projectPath);

      return projectPath;
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Screenshot error:", error);
    throw error;
  }
};
