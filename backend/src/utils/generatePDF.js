import puppeteer from "puppeteer";

const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process"
    ],
  });

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true, // important — renders background colors (dark sidebar)
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });

  await browser.close();
  return pdf;
};

export default generatePDF;
