const Router = require("express").Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const Image = require("../models/Image");
// import { v4 as uuidv4 } from "uuid";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, uuid() + "." + ext);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype.split("/")[1] === "jpeg" ||
        file.mimetype.split("/")[1] === "png"
    )
        cb(null, true);
    else cb(null, false);
};

var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024,
    },
});

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype ===
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//         file.mimetype === "application/pdf"
//     )
//         cb(null, true);
//     else cb(null, false);
// };

Router.get("/", (req, res) => {
    res.send(`${req.originalUrl}`);
});

Router.post("/upload", upload.single("myImage"), async (req, res) => {
    const file = req.file;
    // res.json(req.file);
    if (file) {
        const newImage = new Image({
            ImageID: file.filename.split(".")[0],
            name: file.originalname,
            size: file.size,
            extension: file.mimetype.split("/")[1],
            path: "uploads/" + file.filename,
        });
        const savedImage = await newImage.save();
        res.status(200).json({
            msg: "Success",
            path: "uploads/" + file.filename,
        });
    } else {
        res.status(400).json({
            error: "Select an appropriate image",
        });
    }
});

Router.get("/image/:id", async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const retrivedImg = await Image.findOne({ ImageID: id });
            if (!retrivedImg) {
                res.status(400).json({
                    msg: "Image doesn't exists",
                });
            } else {
                res.status(200).json({
                    img: retrivedImg,
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong",
            error: error,
        });
    }
});

Router.get("/getAll", async (req, res) => {
    try {
        const images = await Image.find({});
        if (images.length < 1) {
            res.status(404).json({
                msg: "no images found",
            });
        } else {
            res.status(200).json({ images: images });
        }
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
});

module.exports = Router;
