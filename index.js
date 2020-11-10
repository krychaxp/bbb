(async () => {
  console.time()
  const { exec } = require("child_process");
  const imagesToPdf = require("images-to-pdf");
  const fs = require("fs");
  const path = require("path");
  const png_folder = "png";
  const captureWebsite = require("capture-website");
  let i = 1;
  try {
    const url = fs
      .readFileSync("file_url.txt", "utf-8")
      .match(/^(.*\/)(\d*)$/)[1];
    console.log("Start...");
    if (fs.existsSync(png_folder)) {
      //remove all images from folder
      fs.readdirSync(png_folder).forEach((v) =>
        fs.unlinkSync(path.join(png_folder, v))
      );
    } else {
      // add folder 'png'
      fs.mkdirSync(png_folder);
    }
    while (true) {
      await captureWebsite.file(url+i, path.join(png_folder, `${i}.png`), {
        scaleFactor: 3,
        timeout:20,
        element: "#surface1",
      });
      console.log("> dodano slajd: " + i);
      i++;
    }
  } catch (e) {
    console.log("Koniec!");
  } finally {
    if (i > 1) {
      const merged_url = `p-bbb-${new Date().toLocaleDateString()}.pdf`;
      imagesToPdf(
        fs.readdirSync("png").map((v) => path.join(png_folder, v)),
        merged_url
      );
      console.log(`Pomyślnie utworzono prezentacje o nazwie: '${merged_url}'`);
    } else {
      console.log("Błędny link");
    }
    console.log("Możesz zamknąć już to okno ;D");
    console.timeEnd()
    exec("pause");
  }
})();
