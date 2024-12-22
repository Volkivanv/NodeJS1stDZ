const fs = require('fs');

fs.appendFile(__filename, '\nconsole.log("Hello");', (err) => {
    if (err) {
        console.error(err);
    }
    console.log("The file was saved!");
});
console.log("Hello");
console.log("Hello");