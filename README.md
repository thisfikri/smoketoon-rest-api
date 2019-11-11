# Smoketoon REST API
This project is a REST API for smoketoon mobile app

## Tech Stack
* NodeJS (https://nodejs.org/)
* ExpressJS (https://expressjs.com/)
* Sequelize (https://sequelize.org/)

## Prerequisites
* Make sure You had been install NodeJs in your system
* install the database server of your choice, e.g MySQL

## Installation & Configuration
Follow these step to install

**Install Package and Dependencies**
```console
$ git clone https://github.com/thisfikri/smoketoon-rest-api.git
$ cd smoketoon-rest-api
$ yarn install # for yarn
$ npm install # for npm
```
**Configuration**
<br />
1. create the database
2. in project folder open ``config/config.json``, change according to your database configuration.

```javascript
// example
{
  "development": {
    "username": "root",
    "password": null,
    "database": "smoketoon",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```
3. change ``app.listen(process.env.PORT||9876, () => console.log(`Listen on Port 9876`))`` to ``app.listen(port, () => console.log(`Listen on Port ${port}`))`` if you want to run it on the local server (You can change the port as you wish), if not don't change it. I use ``process.env.PORT||9876`` because when i use ``port`` it doesn't work when I deploy it on Heroku (https://www.heroku.com).

**Last**
<br />
run
```console
$ npx sequelize db:migrate
$ npm start (the server will run automatically, and the API can be used immediately)
```


## Contact
* WA: +6289514349836

## License
BSD 3-Clause License
See [License](https://github.com/thisfikri/smoketoon-rest-api/blob/master/LICENSE)
