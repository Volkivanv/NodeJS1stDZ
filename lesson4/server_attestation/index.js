const express = require('express');
const path = require('path');
const { checkBody, checkParams } = require('./validation/validator');
const { idScheme, personScheme: personScheme } = require('./validation/scheme');
const {saveJSON} = require('./repository/save');
const app = express();
let persons;
let uniqueID = 0;
const personsPath = path.join(__dirname, 'persons.json');

try{
    persons = require(personsPath);
    persons.forEach(element => {
        if (element.id > uniqueID){
            uniqueID = element.id;
        }
    });
} catch (error) {
    persons = [];
  //  console.error("Error reading JSON data to file:", error);
    
}

app.use(express.json());

/**
 * Получить всех пользователей
 */

app.get('/persons', (req, res) => {
    res.send({ persons: persons });
});

/**
 * Получить конкретного пользователя
 */

app.get('/persons/:id', checkParams(idScheme), (req, res) => {
    const person = persons.find((person) => person.id === Number(req.params.id));

    if (person) {
        res.send({ person: person });
    } else {
        res.status(404);
        res.send({person: null });
    }
});

/**
 * Создание пользователя
 */
app.post('/persons', checkBody(personScheme), (req, res) => {

    uniqueID += 1;

    persons.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID,
    });

    saveJSON(personsPath, persons);
    
});

/**
 * Обновление пользователя
 */
app.put('/persons/:id', checkParams(idScheme), checkBody(personScheme), (req, res) => {

    const person = persons.find((person) => person.id === Number(req.params.id));

    if (person) {
        person.name = req.body.name;
        person.surname = req.body.surname;
        person.age = req.body.age;
        description = req.body.description;

        res.send({ person: person });
        saveJSON(personsPath, persons);
    } else {
        res.status(404);
        res.send({ article: null });
    }

});

/**
 * Удаление пользователя
 */
app.delete('/persons/:id', checkParams(idScheme), (req, res) => {
    const person = persons.find((person) => person.id === Number(req.params.id));

    if (person) {
        const personIndex = persons.indexOf(person);
        persons.splice(personIndex, 1);

        res.send({ person: person });
        saveJSON(personsPath, persons);
    } else {
        res.status(404);
        res.send({ person: null });
    }

});
/**
 * Обработка не существующих маршрутов
 */
app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found!'
    })
});

app.listen(3000); 