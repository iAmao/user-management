### User management
User management REST API

### Getting started
- Open up your terminal
- Clone repository
```
$ git clone https://github.com/iAmao/user-management.git
```
- Install dependencies
```
$ npm install
```
- Create database
```
$ createdb -U postgres um-dev
```
- Add UUID extensions
```
um-dev=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
um-dev=# \q
```
- Run migrations
```
$ npx knex migrate:latest
```
- Start up application
```
$ npm start
```
- Run tests
```
$ npm test
```
