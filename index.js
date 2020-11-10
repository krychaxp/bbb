(async () => {
  console.time();
  const ImagesToPDF = require("images-pdf");
  const { exec } = require("child_process");
  const fs = require("fs");
  const path = require("path");
  const png_folder = "png";
  const captureWebsite = require("capture-website");
  const puppeteer = require("puppeteer");
  const axios = require("axios");
  let i = 1;
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    while (true) {
      await page
        .mainFrame()
        .addStyleTag({ content: "svg{width:100% !important}" });
      //   await page.setViewport({
      //     width: 1700,
      //     height: 1300,
      //     deviceScaleFactor: 1,
      //   });

      await page.goto(
        `https://bbb-one.put.poznan.pl/bigbluebutton/presentation/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/7217cfeab04431aac529c1bf1d45136b42bfa306-1604997550782/svg/${i}`
      );
      if (res.request() == 404) {
        throw Error("koniec");
      }
      await page.screenshot({ path: path.join(png_folder,`${i+[].pad}.png`)});
      console.log("> dodano slajd: " + i);
      i++;
    }
    await browser.close();
  } catch (e) {
    console.log("Koniec!");
  } finally {
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
