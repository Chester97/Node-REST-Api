const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const logger = require('./middlewares/logger');


//connect with mongoose
async function asdf() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async () => {
        // we're connected!
        console.log('connected');
    });
    await mongoose.connect('mongodb://localhost:27017/exampleapp', {
        authSource: 'admin',
        user: 'admin',
        pass: 'admin',
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
asdf();


//innit middleware
app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


//setting static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members Api Routes
app.use('/api/members', require('./routes/api/allMembers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server starting on port: ${PORT}...`)); 