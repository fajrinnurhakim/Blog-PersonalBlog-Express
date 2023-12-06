require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
});

app.post("/blogs", upload.single("image"), async (req, res) => {
    const { title, description, tag } = req.body;
    if (!["TECHNOLOGY", "SPORTS", "TRAVEL", "FOOD"].includes(tag)) {
        return res.status(400).json({ message: "Invalid tag value" });
    }
    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                description,
                tag,
                image: req.file.path,
            },
        });
        res.json({ blog });
    } catch (err) {
        console.log("err", err);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.get("/blogs", async (req, res) => {
    const blogs = await prisma.blog.findMany();
    res.json({ blogs });
});

app.put("/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tag } = req.body;
        if (tag && !["TECHNOLOGY", "SPORTS", "TRAVEL", "FOOD"].includes(tag)) {
            return res.status(400).json({ message: "Invalid tag value" });
        }
        let updatedData = {
            title,
            description,
            tag,
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const blog = await prisma.blog.update({
            where: { id: Number(id) },
            data: updatedData,
        });

        res.json({ blog });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.delete("/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await prisma.blog.delete({
            where: { id: Number(id) },
        });
        res.json({ blog });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.get("/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id: Number(id) },
        });
        res.json({ blog });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
