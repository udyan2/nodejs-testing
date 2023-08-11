const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const fileUpload = require('express-fileupload');

const path = require('path');

const port = 5000;


app.use(cors())


app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



const {spawn} = require('child_process');

app.use(bodyParser.json());


app.use(fileUpload());

app.get('/', (req, res) => {
    res.send("Hello")
})
//Upload file API

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.'); // Handle case where no file was uploaded
    }
  
    const file = req.files.file;
    const uploadPath = path.join(__dirname, '/uploads/', file.name); // Set the path to save the file
  
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err); // Handle any errors that occur during file upload
      }
  
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.name}`; // Construct the URL of the saved file
      console.log(fileUrl)
      res.send(fileUrl); // Send the URL of the saved file to the client
    });
  });


  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });