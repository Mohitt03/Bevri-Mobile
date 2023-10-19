import express  from "express"

const app = express();
const port = 3000;

app.use(express.static("public"))


app.get("/", (req, res) => {
  res.render("index.ejs");  
});

app.get("/menu", (req,res)=>{
  res.render("menu.ejs")
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});