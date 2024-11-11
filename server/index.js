require('dotenv').config();
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require("./routes/users");
const studentRoute = require('./routes/students');
const materialRoute = require('./routes/materials');
const courseRoute = require('./routes/courses');
const authRoute = require('./routes/auth');
const classRoute = require('./routes/class');

const app = express();
const path = require('path');
const port = process.env.PORT ;
const mongoURI = process.env.MONGO_URI

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use('/student', studentRoute);
app.use("/course", courseRoute);
app.use("/class", classRoute);
app.use("/material", materialRoute);

// Mongoose Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});



// Server listener
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});