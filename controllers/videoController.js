const path = require('node:path');

module.exports.loginVideo = (req, res) => {
  const { videoName } = req.params;
  const videoPath = path.join(__dirname, '..', "public", "videos", `${videoName}.mp4`);
  res.sendFile(videoPath);
};