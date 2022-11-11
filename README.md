<h4 align="center">Fastify Server with MongoDB Connection.</h4>

<p align="center">
    <a href="https://github.com/flembee/fastify-server/tree/main">
    <img src="https://img.shields.io/badge/Last%20Commit-November-green?style=flat-square&logo=github&logoColor=white"
         alt="GitHub last commit">
    <a href="https://github.com/flembee/fastify-server/tree/develop">
    <img src="https://img.shields.io/badge/Open%20pull%20requests-0-blue?style=flat-square&logo=github&logoColor=whit"
         alt="GitHub develop branch">
</p>
      
<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#author">Author</a> •
  <a href="#support">Support</a> •
  <a href="#contribute">Contribute</a> •
  <a href="#license">License</a>
</p>

---

## About

<table>
<tr>
<td>
  
This project is a small server using NodeJs and Fastify. It aims to show all the Fastify basics, best practices and recommendations. In addition, the Fastify MongoDB connection is complemented, with Mongoose, by means of a Fastify plugin **[Info Here](https://www.fastify.io/docs/latest/Reference/Plugins/)**

The user logins via Auth, the application is also protected by a rate limiter and during development it exposes a Swagger UI with every endpoint. Read the next section to understand how the project works and how it is recommended to explore it.

</td>
</tr>
</table>

## Installation

##### Downloading and installing steps:
* **[Download or Clone](https://github.com/flembee/fastify-server.git)** the latest version of the Code.

1. Create an `.env` file from the template:

#### MongoDB

```console
PORT=3000
MONGO_URL=
SERVER_PORT=3050
SECRET_KEY=
EXPIRES_IN=6h
RESET_EXPIRES_IN=300000
RESET_SECRET_KEY=
salt=13
GCP_PROJECT_ID=
GCP_SERVICE_ACCOUNT=
GCP_PRIVATE_KEY=
GCP_STORAGE_BUCKET=
```

2. Install dependencies:

```console
$ cd fastify-server/mongodb
$ npm install
$ npm run dev
```

## Features

| All the features|
| :------------- | 
| Login with authorization|
| REST API|
| MongoDB support |
| HTTP Requests|
| GCP Storage|
| Read PDF service|

## Author

| [![Flembee](../flembee.jpeg)](https://www.flembee.com) 	|
|:---------------------------------------------------------------------------------------------------------:	|
|                                            **Flembee**                                            	|

## Support

Contact us at one of the following ways:

- Website at https://www.flembee.com
- Github at **[flembee](https://github.com/flembee)**
- E-Mail: **flembee.technologies@gmail.com**

## Contribute

Feel free to send pull request with new features, bugfix or documentation improvements!

## License

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](https://github.com/flembee/basic-form/blob/main/LICENSE)

- Copyright © [Flembee](https://www.flembee.com).
