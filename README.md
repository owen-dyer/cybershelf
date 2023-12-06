# CyberShelf

## Application Description
CyberShelf is an innovative online storefront that revolutionizes the way customers shop for their favorite products. With CyberShelf, users can seamlessly browse a vast array of high-quality products. CyberShelf offers a user-friendly, one-stop shopping experience, making it convenient for customers to discover and purchase products online.
With CyberShelf, there is no need for users to login before browsing through our inventory. Customers are even able to add products to their cart before being asked to create an account so that they can view the status of their order.
CyberShelf also enables small businesses to grow by providing the opportunity for everyone to sell products. Customers have the option to leave a rating for the vendor which they purchased from, as well as the product that they acquired, after their order is complete. Having an honest review system enables customers to make purchaes from only the most reputable of vendors, and vendors to make informed business decisions based off of customer feedback.

## Contributors
- Celia Cameron
    - GitHub Username: ceca12
    - Email: ceca8169@colorado.edu
- Owen Dyer
    - GitHub Username: owen-dyer
    - Email: owdy8946@colorado.edu
- Jordan Okada
    - GitHub Username: jordanokada
    - Email: jook4324@colorado.edu
- Leo Tellez
    - GitHub Username: leteg3n
    - Email: lete1842@colorado.edu
- Ashton Wilbern
    - GitHub Username: awilbern52
    - Email: aswi7205@colorado.edu
 
## Technology Stack
| Stack | Use |
| --- | --- |
| Azure | Deployment Environment |
| Bootstrap, Tailwind | Frontend Framework |
| Docker | Containerization |
| EJS | Templating |
| GitHub | VCS Repository |
| Mocha, Chai | Testing |
| NodeJS | Application Server |
| PostgreSQL | Database |

## Prerequisites to Run the Application
- Docker Compose must be installed and running in the background in order to run the application.

## How to Run the Application Locally
- Clone the repository via git.
- Navigate to the cloned repository.
- Navigate to each of the following folders in separate terminals and run the "docker-compose up" command within them: webserver, inventory_service, cart_service, order_service, account_service, auth_service, and nginx. Ensure that the account_service container is started before the auth_service, and that all other containers are started before nginx.
- Then boom, you're in business.

## How to Run Tests
- The tests will run automatically each time the application is ran.

## Deployed Application Link
- http://recitation-11-team-06.eastus.cloudapp.azure.com:3000/
