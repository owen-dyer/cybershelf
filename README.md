# CyberShelf

![image](https://github.com/owen-dyer/cybershelf/assets/95600646/bb4b9c9b-13a3-451f-8e7b-e67217ac27e8)

## Table of Contents

- [About](#about)
- [Contributors](#contributors)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Trouble Shooting](#trouble-shooting-does-not-apply-to-nginx)
- [Running Tests](#running-tests)
- [Deployed Application](#deployed-application)

## About

CyberShelf is an innovative online storefront that revolutionizes the way customers shop for their favorite products. With CyberShelf, users can seamlessly browse a vast array of high-quality products. CyberShelf offers a user-friendly, one-stop shopping experience, making it convenient for customers to discover and purchase products online. With CyberShelf, there is no need for users to login before browsing through our inventory.

## Contributors

- Celia Cameron
  - GitHub Username: ceca12
  - Email: <ceca8169@colorado.edu>
- Owen Dyer
  - GitHub Username: owen-dyer
  - Email: <owen.dyer@colorado.edu>
- Jordan Okada
  - GitHub Username: jordanokada
  - Email: <jook4324@colorado.edu>
- Leo Tellez
  - GitHub Username: leteg3n
  - Email: <lete1842@colorado.edu>
- Ashton Wilbern
  - GitHub Username: awilbern52
  - Email: <aswi7205@colorado.edu>

## Technology Stack

| Stack           | Use                    |
| --------------- | ---------------------- |
| Docker          | Containerization       |
| NodeJS          | Backend Application    |
| PostgreSQL      | Database               |
| Express         | HTTP Server            |
| EJS             | Templating             |
| jQuery          | Frontend JS Library    |
| Tailwind        | CSS Framework          |
| Mocha, Chai     | Unit Testing           |
| Microsoft Azure | Deployment Environment |

## Prerequisites

- NPM (tested on v10.2.4)
- Docker Compose (tested on v2.23.0)

## Usage

Clone the repository

> git clone git@github.com:owen-dyer/cybershelf.git

Navigate to each of the following folders:

> 1. [src/webserver](src/webserver)
> 2. [src/account_service](src/account_service)
> 3. [src/inventory_service](src/inventory_service)
> 4. [src/cart_service](src/cart_service)
> 5. [src/order_service](src/order_service)
> 6. [src/nginx](src/nginx)

Execute the following commands in each folder:

> docker compose up

### Trouble Shooting (does not apply to NGINX)

Sometimes Docker fails to install all of the dependencies for each respective container. In the case that this happens, do the following:

> docker compose down -v

Once the container and all volumes associated with it are removed, check that the local node_modules and package-lock.json files are removed. If they are not, execute the following commands:

> - **On Linux/MacOS:** <br>
>   sudo rm -R node_modules/ <br>
>   rm package-lock.json
> - **On Windows:** <br>
>   rmdir /S /Q node_modules <br>
>   del package-lock.json

Now execute the following commands:

> docker compose up

Once the terminal stops printing the startup logs (the last line should say "database system is ready to accept connections" for apps which include a database)

> Ctrl + C

This will exit the Docker startup process since it will hang at that point <br>
Now you need to install the dependencies locally

> npm install

Now execute the following command:

> docker compose up

Now the application should start correctly. If it does, you will see the following terminal output:

> ... Server is running <br>
> Successfully connected to database (except for the Webserver application)

## Running tests

- Tests will run automatically each time the application starts

## Deployed Application: [CyberShelf](http://recitation-11-team-06.eastus.cloudapp.azure.com/)
