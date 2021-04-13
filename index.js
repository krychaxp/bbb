const ImagesToPDF = require("images-pdf");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const png_folder = "png";
const puppeteer = require("puppeteer");
const readLine = async () =>
  new Promise((resolve, reject) => {
    console.log("Podaj link:");
    process.stdin.on("data", function (chunk) {
      try {
        const text = chunk
          .toString()
          .trim()
          .match(/^(.*\/)(\d*)$/)[1];
        resolve(text);
      } catch (error) {
        reject(error);
      }
    });
  });

const main = async () => {
  let i = 1;
  const url = await readLine();
  console.time();
  console.log("Start...");
  if (fs.existsSync(png_folder)) {
    fs.readdirSync(png_folder).forEach((v) =>
      fs.unlinkSync(path.join(png_folder, v))
    );
  } else {
    fs.mkdirSync(png_folder);
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  while (true) {
    let res = await page.goto(url + i);
    if (res.status() != 200) {
      break;
    }
    await page.screenshot({
      path: path.join(png_folder, `${(i + []).padStart(3, 0)}.png`),
      fullPage: true,
    });
    console.log("> dodano slajd: " + i);
    i++;
  }
  await browser.close();

  if (i > 1) {
    const currentData = new Date().toISOString().replace(/:/g, ".");
    const merged_url = `p-bbb-${currentData}.pdf`;
    new ImagesToPDF.ImagesToPDF().convertFolderToPDF(png_folder, merged_url);
    console.log(`Pomyślnie utworzono prezentacje o nazwie: '${merged_url}'`);
  } else {
    console.log("Błędny link");
  }
  console.log("Możesz zamknąć już to okno ;D");
  console.timeEnd();
};

main()
  .catch((e) => console.error(e))
  .finally(() => {
    exec("pause");
    process.exit(1);
  });
