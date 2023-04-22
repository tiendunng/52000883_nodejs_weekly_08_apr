# E-Commerce Lab08-09 Web Advanced Application

## Desciption
- This repository creates API for CRUD products and orders
- In addition, it implements register and login accounts (hash passwords with bcrypt)
- Use mongo database 
- Rest API with expressJS
- **Json web token (JWT)** standard with access token and refresh token

## Configurations
- Connect mongodb and settings connection string in `index.js` file on line `var uri = 'mongodb://127.0.0.1:27017/ecommerce'` (line number 20)
- Config host, port, private key of access token, refresh token in `.env` file

## Running
### GUI register, login
On command line (terminal):
```
    node index.js
```
or dev mode
```
    npm start
```
### API
- Run with `rest client` extension in VSCode and open folder `check-api` (recommend this way)
- Or you can open run with POSTMAN with `api-collection` folder (setting path correctly)

## Author
- Luu Duc Hai