(async () => {
  const { exec } = require("child_process");
  const imagesToPdf = require("images-to-pdf");
  const fs = require("fs");
  const svgToImg = require("svg-to-img");
  const url = fs
    .readFileSync("file_url.txt", "utf-8")
    .match(/^(.*\/)(\d*)$/)[1];
  const axios = require("axios");
  const path = require("path");
  const png_folder = "png";
  let i = 1;
  try {
    if (fs.existsSync(png_folder)) {
      //remove all images from folder
      fs.readdirSync(png_folder).forEach(v=>fs.unlinkSync(path.join(png_folder,v)))
    } else {
      // add folder 'png'
      fs.mkdirSync(png_folder);
    }
    while (true) {
      const { data } = await axios.get(url + i);
      const image = await svgToImg.from(data).toPng();
      fs.writeFileSync(path.join(png_folder, `${i}.png`), image);
      console.log("convert file:" + i);
      i++;
    }
  } catch (e) {
    console.log("end",i==1&&e);
  } finally {
    if (i > 1) {
      imagesToPdf(
        fs.readdirSync("png").map((v) => path.join(png_folder, v)),
        "marged_bbb.pdf"
      );
      console.log("Successfully merged!");
    } else {
      console.log("This url is invalid");
    }
    exec("pause");
  }
})();
