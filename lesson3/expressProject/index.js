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
  // console.log(req.url);
  
  let count = ++jsonData[req.url];
  console.log(req.url);
  console.log(count);
  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
    fs.writeFileSync("./static/counter.json", jsonString);
    console.log("JSON data saved to file successfully.");
  } catch (error) {
    console.error("Error writing JSON data to file:", error);
  }
  next();
});

app.use(express.static("static"));

// app.get('/', (req, res) =>{
//   //  res.send('<h1>Добро пожаловать на мой сайт!</h1>');
//   res.sendFile(path.join(__dirname, 'static/index.html'));
// });

// app.get("/", (req, res) => {
//   res.sendFile("static/index.html");
//   console.log(jsonData["index.html"]);
// });

// app.get("./counter.json", (req, res) => {
//   res.sendFile(JSON.stringify(jsonData));
// });

// app.get("/about", (req, res) => {
//   res.append("<h2>Привет</h2>");
// //  res.sendFile("static/about.html");

//   console.log(jsonData["about.html"]);
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
