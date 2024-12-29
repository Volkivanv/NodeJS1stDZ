const express = require("express");
const fs = require("fs");
const path = require("path");
const jsonData = require("./static/counter.json");
const app = express();


// app.use ((req, res, next) => {
//     console.log('Поступил запрос', req.method, req.url);
//     next();

// })

app.use((req, res, next) => {

  let route = req.path;
  if (!jsonData[route]) {
  jsonData[route] = 0;
  }
  jsonData[route]++;
  
  //let count = ++jsonData[req.url];
  console.log(req.path);
  console.log(jsonData[route]);

  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
    fs.writeFileSync("./static/counter.json", jsonString);
    console.log("JSON data saved to file successfully.");
  } catch (error) {
    console.error("Error writing JSON data to file:", error);
  }
  next();
});

// app.use(express.static("static"));

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'static/index.html'));
});


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, 'static/about.html'));
});

app.get("/counter", (req, res) => {
  res.sendFile(path.join(__dirname, 'static/counter.json'));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
