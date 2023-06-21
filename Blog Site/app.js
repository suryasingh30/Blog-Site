var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var ejs = require("ejs");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

const startingContent = "This is your personal blog page and you can write about how is your day etc etc...";

const aboutPage = "this page is made with love... he he he ";


var username;
var post = [];
var i = 0;

app.get('/' , (req , res)=>{

    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    var day = today.toLocaleDateString("en-US", option);

    res.render('index', {
        kindOfDay: day,
        startContent: startingContent,
        ussrname: username,
        blogsPost: post
    });

});

app.post('/' , (req , res)=>{

    username  = req.body.user;
    console.log(username);
    res.redirect("/");
});

app.get('/compose' , (req , res)=>{

   res.render('compose', {
        userCom: username
   })

});

app.post('/compose' , (req , res)=>{

    const Content = {
        id: i+1,
        ContentTitle: req.body.contentTitle,
        ContentBody: req.body.contentBody
    };
    post.push(Content);
    res.redirect('/');
});

app.get('/about' , (req , res)=>{

   res.render('about', {
        userAbout: username,
        aboutContent: aboutPage
   });

});

app.get('/blog' , (req , res)=>{

    res.render('blog', {
        userBlog: username
    });
 
 });

 app.get('/contact' , (req , res)=>{

    res.render('contact', {
        userContact: username
    });
 
 });

 app.get('/:postName', (req, res) => {
    
    const requestedTitle = (req.params.postName);

    post.forEach(function(post){
        const storedTitle = (post.ContentTitle);

        if(storedTitle === requestedTitle){
            console.log("match found");
            res.render("posts", {
                ussrname: username,
                title: post.ContentTitle,
                content: post.ContentBody
            });
        }
    });



 });

app.listen(8000, function(){
    console.log("server running at 8000...");
});