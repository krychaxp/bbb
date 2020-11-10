// const captureWebsite = require("capture-website");
// captureWebsite.file(
//   "https://bbb-one.put.poznan.pl/bigbluebutton/presentation/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/7217cfeab04431aac529c1bf1d45136b42bfa306-1604997550782/svg/28",
//   "xd.png",
//   {
//     scaleFactor: 3,
//     timeout:15,
//     element:'svg',
//     fullPage:true
//   }
// );
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.mainFrame().addStyleTag({ content: "svg{width:100% !important}" });
  //   await page.setViewport({
  //     width: 1700,
  //     height: 1300,
  //     deviceScaleFactor: 1,
  //   });
  let i = 90;
  const res=await page.goto(
    "https://bbb-one.put.poznan.pl/bigbluebutton/presentation/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/7217cfeab04431aac529c1bf1d45136b42bfa306-1604997550782/svg/" +
      i
  );
  if(res.request()==404){
      throw Error('koniec')
  }
  await page.screenshot({ path: "example.png" });
  console.log("xd");
  i++;
  await page.goto(
    "https://bbb-one.put.poznan.pl/bigbluebutton/presentation/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/01e1a95db3af9409253f5ba623afae95b7ef0276-1604997346165/7217cfeab04431aac529c1bf1d45136b42bfa306-1604997550782/svg/" +
      i
  );
  await page.screenshot({ path: "examplew.png" });
  console.log("rrt");
  await browser.close();
})();
