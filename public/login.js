// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userlogin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Mongoose schemas and models for each form
const Schema = mongoose.Schema;

const userloginSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const logindata = mongoose.model('logindata', userloginSchema);

const signupSchema = new Schema({
    name: String,
    email: String,
    phone: String
});

const signupdata = mongoose.model('signupdata', signupSchema);

const contactSchema = new Schema({
    email: String,
    query: String
});

const contactData = mongoose.model('contactData', contactSchema)


// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Define Express routes for login and register

// Register route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await signupdata.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const newUser = new signupdata({ username, email, password });
        await newUser.save();
        res.redirect('/index2.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await logindata.findOne({ email, password });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        res.redirect('/index.html'); // Redirect to dashboard upon successful login
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Define a route to fetch and display data
// Define a route to serve the main page and fetch data
app.get('/', async (req, res) => {
    try {
        // Fetch data from all forms
        const signupData = await signupdata.find();
        const loginData = await logindata.find();
        const contactdata = await contactData.find();

        // Log the fetched data
        console.log("Sign up Data:", signupdata);
        console.log("Login Data:", logindata);
        console.log("Contact Data:", contactData);

        // Serve the main page
        res.sendFile(path.join(__dirname, 'index2.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/index2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});
// Serve the login page
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});

app.get('/signup.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.css'));
});

app.get('/img-featured-1.avif', (req, res) => {
    res.sendFile(path.join(__dirname, 'img-featured-1.avif'));
});

app.get('/house1.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'house1.jpg'));
});

app.get('/house1.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'house1.jpg'));
});

app.get('/bg-image1.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'bg-image1.jpg'));
});

app.get('/img-featured2.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname, 'img-featured2.jpeg'));
});

app.get('/pfp.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'pfp.jpg'));
});







// Start the server
const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});