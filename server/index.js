require('dotenv').config();
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const findOrCreate = require('mongoose-findorcreate');
const userRoute = require("./routes/user");
const adminRoute = require('./routes/admin');
const courseRoute = require('./routes/course');
const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT ;
const mongoURI = process.env.MONGO_URI

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/auth", authRoute);
app.use("/courses", courseRoute);

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