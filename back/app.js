const express = require("express");
const app = express();
const port = 5001;
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer();

const mongoUrl = "mongodb+srv://souheil94:soubar88@cluster0.wzhodfr.mongodb.net/";


mongoose.connect(mongoUrl)
    .then(() => {
    console.log("Database connected");
})
.catch((e)=>{
    console.log(e);
});

// Tables

require("./tables/UserDetails");
require("./tables/CategorieDetails");
require("./tables/ImageDetails");
require("./tables/VideoDetails");
require("./tables/FilePDFDetails");
require("./tables/EventDetails");
//require("./tables/EventDetails");

// Instance Tables

const User = mongoose.model("User");
const Categorie = mongoose.model("Categorie");
const Image = mongoose.model("Image");
const Video = mongoose.model("Video");
const FilePDF = mongoose.model("FilePDF");
const Event = mongoose.model("Event");
//const Event = mongoose.model("Event");

// Get All

app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

/** <<<<<<<<<<<<<<<<<<< Table User >>>>>>>>>>>>>>>>>>>>>> */

// Signin User

app.post('/signin', async(req, res) => {
    const { nomPrenom, email, username, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "User already exists !!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            nomPrenom: nomPrenom,
            email: email,
            username: username,
            password: encryptedPassword
        });
        res.send({ status: "OK", data: "User Created" });
    }
    catch (error) {
        res.send({ status: "Error", data: error });
    }
});

// Login User

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    
   try {
    const oldUser = await User.findOne({ username: username });

    if (!oldUser) {
        return res.send({ status: "Error", data: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordValid) {
        return res.send({ status: "Error", data: "Invalid password" });
      }

    res.send({ status: "OK", data: "Login successful" });
   } catch (error) {
    res.send({ status: "Error", data: error });
   }
});

// Get User

app.get("/user/:_id", async(req, res) => {
    
    try {
        const userId = req.params._id;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found !" });
        }

        const sanitizedUser = {
            _id: user._id,
            nomPrenom: user.nomPrenom,
            email: user.email,
        };

        res.json({ status: "OK", data: sanitizedUser });

    } catch (error) {
        console.error('Error fetching user : ', error);
        res.send({ status: "Error", message: 'Server error' });
    }
});

// Logout

/*
router.post('/logout', (req, res) =>{

    req.
})
*/

/** <<<<<<<<<<<<<<<<<<< Table Categorie >>>>>>>>>>>>>>>>>>>>>> */

// Add Categorie

app.post('/categorie/create', async (req, res) => {
    const { titre, dateDebut, dateFin } = req.body;

    try {
        Categorie.create({
            titre: titre,
            dateDebut: dateDebut,
            dateFin: dateFin
        });
        res.send({ status: "OK", data: "Categorie Created" });
    } catch (error){
        res.send({ status: "Error", data: error });
    }
});

// Get all categories

app.get('/all-categories', async (req, res) => {
    try {
        const categories = await Categorie.find();
        if (!categories) {
            return res.status(404).json({ status: 'Error', message: 'No categories found' });
          }
        res.json({ status: 'OK', data: categories });
    } 
    catch (error) {
        console.error('Error fetching categories: ', error);
        res.status(500).json({ status: 'Error', message: 'Server error' });
      }
});

/** <<<<<<<<<<<<<<<<<<< Table Image >>>>>>>>>>>>>>>>>>>>>> */

// Upload Image

app.post('/upload-image', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        
        // Create a new instance of the File model
        const newImage = new Image({
            name: originalname,
            type: 'image', // Assuming you pass the type in the request body
            data: buffer,
            contentType: mimetype,
        });

        // Save the file to the database
        await newImage.save();

        res.status(201).send('Image uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get All Images

app.get('/all-images', async (req, res) => {
    try {
        const images = await Image.find();
        if (!images) {
            return res.status(404).json({ status: 'Error', message: 'No images found' });
          }
        res.json({ status: 'OK', data: images });
    } 
    catch (error) {
        console.error('Error fetching images: ', error);
        res.status(500).json({ status: 'Error', message: 'Server error' });
      }
});

/** <<<<<<<<<<<<<<<<<<< Table Video >>>>>>>>>>>>>>>>>>>>>> */

// Upload Video

app.post('/upload-video', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        
        // Create a new instance of the Video model
        const newVideo = new Video({
            name: originalname,
            type: 'video', // Since this is for the "Video" table, set the type to 'video'
            data: buffer,
            contentType: mimetype,
        });

        // Save the video to the database
        await newVideo.save();

        res.status(201).send('Video uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get All Videos


/** <<<<<<<<<<<<<<<<<<< Table FilePDF >>>>>>>>>>>>>>>>>>>>>> */

// Upload PDF

app.post('/upload-pdf', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        
        // Create a new instance of the Video model
        const newFilePDF = new FilePDF({
            name: originalname,
            type: 'pdf', // Since this is for the "Video" table, set the type to 'video'
            data: buffer,
            contentType: mimetype,
        });

        // Save the video to the database
        await newFilePDF.save();

        res.status(201).send('File PDF uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get All PDFs

/** <<<<<<<<<<<<<<<<<<< Table Event >>>>>>>>>>>>>>>>>>>>>> */

// Create Event

app.post('/event/create', async (req, res) => {
    const { dateEvent, titreEvent, descTxtEvent, descSimpleEvent, descFullEvent, categorieEvent, imageEvent } = req.body;

    try {
        Event.create({
            dateEvent: dateEvent,
            titreEvent: titreEvent,
            descTxtEvent: descTxtEvent,
            descSimpleEvent: descSimpleEvent,
            descFullEvent: descFullEvent,
            categorieEvent: categorieEvent,
            imageEvent: imageEvent
        });

        res.send({ status: "OK", data: "Event Created" });
    } catch (error){
        res.send({ status: "Error", data: error });
    }
});

// Get Event By Categorie

app.get('/events-by-categorie', async (req, res) => {
    try {
        // First, retrieve all categories
        const categories = await Categorie.find({});

        // Loop through each category to find its associated events
        const eventsByCategorie = await Promise.all(categories.map(async (categorie) => {
            const events = await Event.find({ categorieEvent: categorie._id });
            return { categorie, events };
        }));

        // Send the response
        res.json(eventsByCategorie);
    } catch (error) {
        console.error('Error fetching events by categorie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get All Images

app.get('/all-events', async (req, res) => {
    try {
        const events = await Event.find();
        if (!events) {
            return res.status(404).json({ status: 'Error', message: 'No events found' });
          }
        res.json({ status: 'OK', data: events });
    } 
    catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).json({ status: 'Error', message: 'Server error' });
      }
});

/** <<<<<<<<<<<<<<<<<<< Table QRCode >>>>>>>>>>>>>>>>>>>>>> */

app.listen(port, () => {
    console.log("Nodejs server started");
});