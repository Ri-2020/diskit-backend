// const axios = require("axios");
// const cheerio = require("cheerio");

// const url = "https://www.youtube.com/watch?v=zzfRw5WV5HE";
// axios(url)
//   .then((response) => {
//     const html = response.data;
//     console.log(html);
//     const $ = cheerio.load(html);
//     const salePrice = $(".ytd-video-primary-info-renderer").text();
//     console.log(salePrice);
//     if (salePrice == null) {
//       console.log("Null");
//     }
//   })
//   .catch(console.error);

// const youtube = require("scrape-youtube");
// const { youtube } = require('scrape-youtube');
import youtube from "scrape-youtube";

// youtube
//   .search("https://www.youtube.com/watch?v=zzfRw5WV5HE")
//   .then((results) => {
//     // Unless you specify a custom type you will only receive 'video' results
//     console.log(results.videos[0]);
//   });

const extractData = async (url) => {
  try {
    const data = await youtube.search(url);
    // console.log(data.videos[0]);
    return data.videos[0];
  } catch (e) {
    console.log(e);
  }
};

const url = "https://www.youtube.com/watch?v=zzfRw5WV5HE"; //why this url is why this url is hardcoded
console.log(url.split("=")[1].split("&")[0]);
console.log(url.split("&")[0]);
const ll = "https://youtu.be/j3yFVc4PX2w";

// const data = await youtube.search(url);
// console.log(data[0]);

const extractedData = await extractData(ll);
console.log(extractedData);
// if (extractedData != null) {
//   const newDiskit = new VideoModel({
//     title: extractedData.title,
//     link: extractedData.link,
//     videoId: extractedData.id,
//     description: extractedData.description,
//     uploadedDate: extractedData.uploaded,
//     thumbnail: extractedData.thumbnail,
//     views: extractedData.views,
//     duration: extractedData.duration,
//     channel: extractedData.channel,
//   });
//   // await newDiskit.save();
//   // const diskit = await VideoModel.findOne({ link: link });
//   // res.status(201).send({
//   //   status: "success",
//   //   message: "New Diskit has been creaetd",
//   //   diskit: diskit,
//   // });
// } else {
//   res.send("message : error while fetching data form youtube");
// }
