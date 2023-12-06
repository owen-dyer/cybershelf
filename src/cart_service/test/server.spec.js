<<<<<<< HEAD
// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

 
//Checking get in order to display products added to cart taken from database
it('positive : /add_to_cart', done => {
    chai
      .request(server)
      .get('/add_to_cart')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });
  //Check if buying more than balance
it('Negative : /checkout. Checking invalid checkout', done => {
    chai
      .request(server)
      .post('/checkout)
      .send({id: '5', name: 10, dob: '2020-02-20'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
=======
// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

  // ===========================================================================
  // TO-DO: Part A Login unit test case
  //We are checking POST /add_user API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
//Positive cases
//Checking get in order to display products added to cart taken from database
it('positive : /add_to_cart', done => {
    chai
      .request(server)
      .get('/add_to_cart')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });
  //Check if buying more than balance
it('Negative : /checkout. Checking invalid checkout', done => {
    chai
      .request(server)
      .post('/ad)
      .send({id: '5', name: 10, dob: '2020-02-20'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });
>>>>>>> main
});