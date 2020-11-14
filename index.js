(async () => {
  console.time();
  const ImagesToPDF = require("images-pdf");
  const { exec } = require("child_process");
  const fs = require("fs");
  const path = require("path");
  const png_folder = "png";
  const puppeteer = require("puppeteer");
  let i = 1;
  let browser;
  try {
    const url = fs
      .readFileSync("file_url.txt", "utf-8")
      .match(/^(.*\/)(\d*)$/)[1];
    console.log("Start...");
    if (fs.existsSync(png_folder)) {
      fs.readdirSync(png_folder).forEach((v) =>
        fs.unlinkSync(path.join(png_folder, v))
      );
    } else {
      fs.mkdirSync(png_folder);
    }
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1700,
      height: 1300,
      deviceScaleFactor: 1,
    });
    while (true) {
      // await page
      //   .mainFrame()
      //   .addStyleTag({ content: "svg{width:100% !important}" });

      let res = await page.goto(url + i);
      if (res.status() != 200) {
        throw new Error("koniec");
      }
      await page.screenshot({
        path: path.join(png_folder, `${(i + []).padStart(3, 0)}.png`),
      });
      console.log("> dodano slajd: " + i);
      i++;
    }
  } catch (e) {
    console.log("Koniec!");
  } finally {
    await browser.close();
    if (i > 1) {
      const merged_url = `p-bbb-${new Date().toLocaleDateString()}.pdf`;
      new ImagesToPDF.ImagesToPDF().convertFolderToPDF(png_folder, merged_url);
      console.log(`Pomyślnie utworzono prezentacje o nazwie: '${merged_url}'`);
    } else {
      console.log("Błędny link");
    }
    console.log("Możesz zamknąć już to okno ;D");
    console.timeEnd();
    exec("pause");
  }
})();
