const express = require("express");
const nodemon = require("nodemon");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const imageRoute = require("./api/image");

app.use(cors());

mongoose.connect(
    "mongodb+srv://nishtha:qwerty123@cluster0.s9dmd.mongodb.net/imageDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log(mongoose.connection.readyState);
        console.log("Connected to DB");
    }
);

app.use("/uploads", express.static("uploads"));

app.use("/api/image", imageRoute);

app.get("/imagePreview", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "imagePreview.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "index.html"));
//     });
// }

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on Port ${PORT}`);
});
