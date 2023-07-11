import VideoModel from "../models/videoSchema.js";
import youtube from "scrape-youtube";

class videoController {
  static extractData = async (url) => {
    try {
      const data = await youtube.search(url);
      console.log(data.videos[0]);
      console.log(data);
      return data.videos[0];
    } catch (e) {
      console.log(e);
      return { error: e };
    }
  };

  static makeNewDiskit = async (req, res) => {
    try {
      const { videoUrl } = req.body;

      var id = "";
      console.log(videoUrl);
      const link = videoUrl.split("&")[0];
      if (videoUrl.split("/")[2] == "youtu.be") {
        id = videoUrl.split("/")[3];
      } else {
        id = videoUrl.split("=")[1].split("&")[0];
      }
      console.log(id);
      const diskit = await VideoModel.findOne({ videoId: id });
      console.log(diskit);
      if (diskit) {
        res.send({ message: "Diskit already found" });
      } else {
        const extractedData = await this.extractData(link);
        console.log(extractedData);
        if (extractedData != null) {
          const newDiskit = new VideoModel({
            title: extractedData.title,
            link: extractedData.link,
            videoId: extractedData.id,
            description: extractedData.description,
            uploadedDate: extractedData.uploaded,
            thumbnail: extractedData.thumbnail,
            views: extractedData.views,
            duration: extractedData.duration,
            channel: extractedData.channel,
          });
          await newDiskit.save();
          const diskit = await VideoModel.findOne({ link: extractedData.link });
          res.status(201).send({
            status: "success",
            message: "New Diskit has been creaetd",
            videoData: diskit,
          });
        } else {
          res.send("message : error while fetching data form youtube");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  static showDiscussion = async (req, res) => {
    try {
      const { videoUrl } = req.body;

      if (videoUrl) {
        var id = "";
        console.log(videoUrl);
        if (videoUrl.split("/")[2] == "youtu.be") {
          id = videoUrl.split("/")[3];
        } else {
          id = videoUrl.split("=")[1].split("&")[0];
        }
        // const extractedUrl = videoUrl.split("=")[1].split("&")[0];
        const videoData = await VideoModel.findOne({ videoId: id });
        if (videoData != null) {
          res.status(200).send({
            status: "success",
            message: "video found",
            videoData: videoData,
          });
        } else {
          res.status(404).send({
            status: "failed",
            message: "video disscussion not found, you  can make one",
          });
        }
      } else {
        res.status(404).send({
          status: "failed",
          message: "Url not found",
        });
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).send({
        status: "failed",
        message: "Internal server error",
      });
    }
  };
  static getDiskit = async (req, res) => {
    try {
      const diskitsData = await VideoModel.find({});
      
      if (diskitsData != null) {
        res.status(200).send({
          status: "success",
          message: "video found",
          diskitsData: diskitsData,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "video disscussion not found, you  can make one",
        });
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).send({
        status: "failed",
        message: "Internal server error",
      });
    }
  };
}

export default videoController;
