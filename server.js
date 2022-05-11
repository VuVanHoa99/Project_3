const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/paymentRouter'));


// connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    //useCreateIndex: true, // for indexing
    //useFindAndModify: false, // for update and delete
    useNewUrlParser: true, // for new url parser
    useUnifiedTopology: true // for new url parser
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb');
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})