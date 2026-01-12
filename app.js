import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts= []

app.get("/",(req,res)=>{
    res.render("home",{posts : posts})
})

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  }; 
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const postId = req.params.id; // Get the "id" from the URL
  const post = posts[postId];   // Find the post in your array

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post", { post: post });  // Render post.ejs with this post
});

app.post("/delete", (req, res) => {
  const index = req.body.postIndex;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port,()=>{
    console.log(`server ${port}`)
})