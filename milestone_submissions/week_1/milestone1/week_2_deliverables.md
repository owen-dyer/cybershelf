# UAT Plan
1. A user cannot checkout without logging in/registering for an account. Mandatory fields include:
- customer name
- email address
- password
- confirm password
test data: database updating
test environment: any personal device without admin privileges 
test results: a user registers an account and the database is updated with the given information
tester: Jordan 

2. A customer cannot purchase items without filling out all of the mandatory fields in the checkout form. These include:
- credit/debit card information 
- customer name
- billing address
- shipping address
test data: checkout form processing
test environment: any personal device without admin privileges
test results: a checkout request is processed
tester: Celia?

3. A seller cannot list items for sale without filling out all of the mandatory fields in the product form. These include:
- product name
- price
- photo
- description
- category
test data: form processing
test environment: a personal device (not admin)
test results: item is listed and added to product database
tester: Leo?

4. A customer cannot add an item to their cart without first selecting an item and a quantity. These include:
- item name
- item quantity
test data: form processing
test environment: any personal device without admin privileges
test results: Item is added to users cart after selecting item and quantity
tester: Owen?