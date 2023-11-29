# UAT Plan
1. A user cannot checkout without logging in/registering for an account. Mandatory fields include:
- Customer Name
- Email Address
- Password
- Confirm Password
Test data: Database updating
Test Environment: Any personal device without admin privileges
Test Results: A user registers a account and the Database is updated with the given information
Tester:
Information from the form is stored in the customer table in the account_db database.

2. A customer cannot purchase items without filling out all of the mandatory fields in the checkout form. These include:
- Credit/Debit Card Information
- Customer Name
- Billing address
- Shipping address
Test data: Checkout form processing
Test Environment: Any personal device without admin privileges
Test Results: A checkout request is processed
Tester:
3. A seller cannot list items for sale without filling out all of the mandatory fields in the product form. These include:
- Product Name
- Price
- Photo (optional)
- Description
- Category
Test data:
Test Environment: Any personal device without admin privileges
Test Results: Item is listed and added to product database
Tester:
4. A customer cannot add an item to their cart without first selecting an item and a quantity. These include:
- Item Name
- Item Quantity
Test data:
Test Environment: Any personal device without admin privileges
Test Results: Item is added to users cart after selecting item and quantity
Tester:
