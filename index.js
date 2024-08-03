import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store posts
let posts = [];

app.get("/create-post", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/create-post", (req, res) => {
    const title = req.body["title"];
    const content = req.body["content"];
    const id = Date.now(); // Generate a unique ID based on the current timestamp

    // Add the new post to the posts array
    posts.push({ id, title, content });

    // Redirect to /posts to display all posts
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("posts", { posts });
});

app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    posts = posts.filter(post => post.id !== id);
    res.sendStatus(204); // No Content
});

app.listen(port, () => {
    console.log("listening on server " + port);
});
