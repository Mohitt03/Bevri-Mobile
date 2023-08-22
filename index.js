
import express  from "express";



const app = express();
const port = 3000;

app.use(express.static("public"))



var d = "Jagat";

app.get("/", (req, res) => {
  res.render("index.ejs",{value:d});  
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});