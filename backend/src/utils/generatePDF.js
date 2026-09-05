import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import os from "os";

const getLocalExecutablePath = () => {
  const platform = os.platform();
  if (platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  }
  if (platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  return "/usr/bin/google-chrome"; // linux fallback
};

const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.NODE_ENV === "production"
        ? await chromium.executablePath()
        : getLocalExecutablePath(),   // ✅ CHANGED — now checks actual OS instead of assuming Linux
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });

  await browser.close();
  return pdf;
};

export default generatePDF;