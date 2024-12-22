const fs = require('fs');

fs.writeFile('./test.txt', 'console.log("Hello")', (err) => {
    if (err) {
        console.error(err);
    }
    console.log("The file was saved!");
});