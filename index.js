import express  from "express"

const app = express();
const port = 3000;

app.use(express.static("public"))


app.get("/About", (req, res) => {
  res.render("index.ejs");  
});

app.get("/menu", (req,res)=>{
  res.render("menu.ejs")
});

app.get("/groups", (req,res)=>{
  res.render("groups.ejs")
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});