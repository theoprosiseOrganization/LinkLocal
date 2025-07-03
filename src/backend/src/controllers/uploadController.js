const {
  S3Client,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Specify the AWS region from environment variables
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID from environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Secret access key from environment variables
  },
});

/**
 * This function uploads event images to an S3 bucket.
 * It first checks if the eventId is provided, then uploads each image file
 * to the specified S3 bucket under a folder named after the eventId.
 * Each image is stored with a unique key based on the current timestamp.
 * Each event's images are stored under a folder named after the eventId.
 *
 * @param {Object} req - The request object containing the eventId and image files.
 * @param {Object} res - The response object to send the result or error.
 * @returns {Promise<void>} A promise that resolves when the upload is complete or rejects with
 * an error.
 * @throws {Error} If the eventId is missing, no files are uploaded, or
 * if the upload fails.
 */
exports.uploadEventImages = async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const uploadPromises = req.files.map(async (file) => {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `eventImages/${eventId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Use PutObjectCommand for SDK v3
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Construct the public URL manually
      const url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      return url;
    });

    const urls = await Promise.all(uploadPromises);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

/**
 *
 * This function uploads a profile image to an S3 bucket.
 * It first checks if the userId is provided, then lists existing images for that user,
 * deletes them if they exist, and finally uploads the new profile image.
 * Each user's profile images are stored under a folder named after the userId.
 *
 * @param {Object} req - The request object containing the userId and the profile image file.
 * @param {Object} res - The response object to send the result or error.
 * @returns {Promise<void>} A promise that resolves when the upload is complete or rejects with
 * an error.
 * @throws {Error} If the userId is missing, no file is uploaded, or if the upload fails.
 */
exports.uploadProfileImage = async (req, res) => {
  const userId = req.body.userId || req.user?.id;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const bucket = process.env.AWS_S3_BUCKET;
  const prefix = `userAvatars/${userId}/`;

  try {
    // List existing images for the user
    const listParams = {
      Bucket: bucket,
      Prefix: prefix,
    };
    const listCommand = new ListObjectsV2Command(listParams);
    const listResult = await s3Client.send(listCommand);

    // Delete existing images if any
    if (listResult.Contents && listResult.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucket,
        Delete: {
          Objects: listResult.Contents.map((obj) => ({ Key: obj.Key })),
        },
      };
      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      await s3Client.send(deleteCommand);
    }

    // Upload new profile image
    const key = `${prefix}${Date.now()}_${req.file.originalname}`;
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    // Construct the public URL
    const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};
