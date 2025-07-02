const { S3Client, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
    region: process.env.AWS_REGION, // Specify the AWS region from environment variables
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID from environment variables
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // Secret access key from environment variables
    }
});

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
                ContentType: file.mimetype
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
        console.error("Error uploading images:", err);
        res.status(500).json({ error: "Upload failed" });
    }
};