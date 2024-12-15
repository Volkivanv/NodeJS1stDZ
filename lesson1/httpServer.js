const createCounter = () => {
    let counter = 0;
    return () => {
      return ++counter;
    };
  };
  const counter1 = createCounter();
  const counter2 = createCounter();

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Запрос получен");
  
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>Добро пожаловать на мой сайт! Входов на страницу: ${counter1()} </h1>`);
  } else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>About. Входов на страницу: ${counter2()}</h1>`);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end("<h1>Страница не найдена!</h1>");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
