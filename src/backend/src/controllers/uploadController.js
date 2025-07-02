const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.uploadEventImages = async (req, res) => {
  const { eventId } = req.body; // eventId should be sent in the form data
  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const uploadPromises = req.files.map((file) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `eventImages/${eventId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };
      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.Location);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};
