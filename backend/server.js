const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
require("colors");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const isAuthUser = require("./middleware/is-user");
const isAuthCompany = require("./middleware/is-company");

const User = require("./models/User");
const JobEvent = require("./models/JobEvent");


const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "CTV",
        format: async () => "jpg",
        public_id: (req, file) => file.filename
    },
})

if (process.env.NODE_ENV === "production") console.log = function () { };

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Upload 
app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join('public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storages });

app.put("/api/v1/user/profile/:id", upload.single("cv"), isAuthUser, async (req, res) => {
    const { id } = req.params;
    const { username, email, university, fullName, address } = req.body;
    try {
        if (!req.user) return res.status(400).send("You dont have permission");
        const user = await User.findById(id).lean();
        if (!user) return res.status(400).send("User does not exist");
        if (req.file) {
            const profileUserObj = {
                username: username,
                email: email,
                fullName: fullName,
                university: university,
                address: address,
                cv: req.file.path,
            };
            const newProfileUser = await User.findByIdAndUpdate(
                { _id: id },
                {
                    username: profileUserObj.username,
                    email: profileUserObj.email,
                    university: profileUserObj.university,
                    fullName: profileUserObj.fullName,
                    address: profileUserObj.address,
                    cv: profileUserObj.cv,
                },
                { new: true }
            );
            return res.status(200).json(newProfileUser);
        }
        else {
            const profileUserObj = {
                username: username,
                email: email,
                university: university,
                fullName: fullName,
                address: address,
            };
            const newProfileUser = await User.findByIdAndUpdate(
                { _id: id },
                {
                    username: profileUserObj.username,
                    email: profileUserObj.email,
                    university: profileUserObj.university,
                    fullName: profileUserObj.fullName,
                    address: profileUserObj.address,
                },
                { new: true }
            );
            return res.status(200).json(newProfileUser);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});

app.put("/api/v1/company/profileCompany/:id", upload.single("avatar"), isAuthCompany, async (req, res) => {
    const { id } = req.params;
    const getJob = await JobEvent.find({ poster: id }).populate("city");
    const { username, email, nameCompany, address, webAddress, companyIntro, quantityEmployees, city } = req.body;
    try {
        if (!req.company) return res.status(400).send("You dont have permission");
        const user = await User.findById(id).lean();
        if (!user) return res.status(400).send("User does not exist");
        if (req.file) {
            const profileUserObj = {
                username: username,
                email: email,
                nameCompany: nameCompany,
                address: address,
                webAddress: webAddress,
                companyIntro: companyIntro,
                quantityEmployees: quantityEmployees,
                job: getJob,
                city: city,
                avatar: req.file.path,
            };
            const newProfileCompany = await User.findByIdAndUpdate(
                { _id: id },
                {
                    username: profileUserObj.username,
                    email: profileUserObj.email,
                    nameCompany: profileUserObj.nameCompany,
                    address: profileUserObj.address,
                    webAddress: profileUserObj.webAddress,
                    companyIntro: profileUserObj.companyIntro,
                    quantityEmployees: profileUserObj.quantityEmployees,
                    job: profileUserObj.job,
                    city: profileUserObj.city,
                    avatar: profileUserObj.avatar,
                },
                { new: true }
            );
            return res.status(200).json(newProfileCompany);
        }
        else {
            const profileUserObj = {
                username: username,
                email: email,
                nameCompany: nameCompany,
                address: address,
                webAddress: webAddress,
                companyIntro: companyIntro,
                quantityEmployees: quantityEmployees,
                job: getJob,
                city: city,
            };
            const newProfileCompany = await User.findByIdAndUpdate(
                { _id: id },
                {
                    username: profileUserObj.username,
                    email: profileUserObj.email,
                    nameCompany: profileUserObj.nameCompany,
                    address: profileUserObj.address,
                    webAddress: profileUserObj.webAddress,
                    companyIntro: profileUserObj.companyIntro,
                    quantityEmployees: profileUserObj.quantityEmployees,
                    job: profileUserObj.job,
                    city: profileUserObj.city,
                },
                { new: true }
            );
            return res.status(200).json(newProfileCompany);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/company", require("./routes/company"));
app.use("/api/v1/admin", require("./routes/admin"));

module.exports = app;