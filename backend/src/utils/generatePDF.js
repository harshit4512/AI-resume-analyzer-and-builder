// import puppeteer from "puppeteer";

// const generatePDF = async (html) => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--single-process"
//     ],
//   });

//   const page = await browser.newPage();

//   await page.setContent(html, { waitUntil: "networkidle0" });

//   const pdf = await page.pdf({
//     format: "A4",
//     printBackground: true, // important — renders background colors (dark sidebar)
//     margin: { top: "0", bottom: "0", left: "0", right: "0" },
//   });

//   await browser.close();
//   return pdf;
// };

// export default generatePDF;

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.NODE_ENV === "production"
      ? await chromium.executablePath()
      : "/usr/bin/google-chrome", // local Chrome path (Mac: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
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


