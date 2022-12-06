const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;

const app = express();

// *** FOR THE THREE MANDATORY FIELDS YOU HAVE TO FIRST SIGN-IN IN CLOUDINARY *** 
cloudinary.config({
    cloud_name: "YOUR CLOUDINARY CLOUD NAME",
    api_key: "YOUR CLOUDINARY API KEY",
    api_secret: "YOUR CLOUDINARY API SECRET"
  });
  

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));

app.get("/", (req, res) => {
    res.send("<h1> Handling-Forms-and-Images-with-ejs-and-Cloudinary </h1>");
  });


app.get("/myget", (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
  
app.post("/mypost", async (req, res) => {
    console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  //                              **** For Multiple images upload ***
  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users"
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      });
    }
  }

//                                 *** For single image upload ***
//   let file = req.files.samplefile;
//   result = await cloudinary.uploader.upload(file.tempFilePath, {
//     folder: "users",
//   });

  console.log(result);

  let details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email : req.body.email,
    result,
    
  };
  console.log(details);

    res.send(details);
  });
  
app.get('/getform', (req,res) => {

    res.render("getForm")
})
app.get('/postform', (req,res) => {

    res.render("postForm")
})

app.listen(3000,() => {

    console.log("Server is running at port 3000");
})
