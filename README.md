# API-wine-

## Pre-requisite

- node 12.16.3
- npm 6.14

## Getting started

- **git clone**
- **npm install**
- **npm run dev** : Start local development server using **nodemon**
- **create your .env file**

## Environment variables

```bash
    DB_HOST=localhost #database host
    DB_USER=johndoe #database user
    DB_PASSWORD=superpassword #password of the database user
    DB_NAME=sample #database name
    DB_DIALECT=mysql #one of mysql | postgres | mssql | mariadb | sqlite
    DB_TEST=sample_test #database for test env
    PORT=5050 #port to listen for your server
    SECRETt=yoursecretforjwt #secret used for jwt encryption
```

## Execution and writing of tests

- **npm test** : Start test server using mocha
- Using **Chai** and **Chai-http** with method _`expect`_

## Curious behavior

- importing a route in a model will **_crash_** or **_not validate_** your tests

## Authors


##### [Marion](https://www.linkedin.com/in/marion-hourdou/)

