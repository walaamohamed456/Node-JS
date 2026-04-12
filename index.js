const express = require("express");

const app = express(); //created server

const mongoose = require("mongoose")

app.use(express.json())

const Article = require("./models/Article")


mongoose.connect("mongodb+srv://wm5759636_db_user:5yW9v0znjAJ9dlSm@cluster0.wsgdh4f.mongodb.net/moviesDB")
    .then(() => {
        console.log("connection successfully");

    }).catch(() => {
        console.log("error with connecting database");

    })


app.get("/hello", (req, res) => {
    res.send("hello")

})

app.get("/hi", (req, res) => {
    res.send("you visited hi")

})
app.get("/test", (req, res) => {
    res.send("test")

})

app.get("/", (req, res) => {
    res.send("hello on postman")
})


app.get("/welcome", (req, res) => {
    const name = req.query.name;
    res.send("Welcome " + name);
});

//path prameters
app.get("/findSummation/:number1/:number2", (req, res) => {
    const num1 = req.params.number1
    const num2 = req.params.number1

    const total = Number(num1) + Number(num2)
    // res.send(`the Number are: ${num1} /${num2}`)
    res.send(`the Total is: ${total}`)

    console.log(req.params);
})

//json format
app.get("/SayHello", (req, res) => {
    res.json({
        name: req.body.name,
        age: req.query.age,
        languag: "Arabic"
    })
})

//query prametrs
app.get("/SayHello", (req, res) => {
    // console.log(req.body);
    res.send(`My Age ${req.query.age}`)
    console.log(req.query);
})


//body prametrs
app.get("/SayHello", (req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name}`)
})




app.post("/addComment", (req, res) => {
    res.send("post request on add ccomment")
})


app.delete("/testingDelete", (req, res) => {
    res.send("delete request");
});
// ARTICLES ENDPOINTS

app.post("/articles", async (req, res) => {
    const newArticle = new Article()

    const artTitle = req.body.title
    const artBody = req.body.body

    // res.send(artTitle + " " + artBody)
    // return
    newArticle.title = artTitle
    newArticle.body = artBody
    newArticle.numbrofLikes = 0

    await newArticle.save()
    res.json(newArticle)
})

app.get("/articles", async (req, res) => {
    const articles = await Article.find()
    console.log("the articles are", articles);
    res.json(articles)
})

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId
    try {

        const article = await Article.findById(id)
        res.json(article)
        return
    } catch (error) {
        console.log("error while reading article of id ", id);
        return res.send("error")
    }
})


app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId
    try {

        const article = await Article.findByIdAndDelete(id)
        res.json(article)
        return
    } catch (error) {
        console.log("error while reading article of id ", id);
        return res.send("error")
    }
})




app.listen(3000, () => {
    console.log("I am Listening in port 3000");

})

