const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));


app.get("/myget", (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
  
app.post("/mypost", (req, res) => {
    console.log(req.body);
  console.log(req.files);
    res.send(req.body);
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
