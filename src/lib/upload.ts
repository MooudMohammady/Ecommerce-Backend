import { S3 } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const config = {
  endpoint: process.env.LIARA_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY!,
    secretAccessKey: process.env.LIARA_SECRET_KEY!,
  },
  region: "default",
};

const s3 = new S3(config);

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME!,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
  }),
});

export default upload;
