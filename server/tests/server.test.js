const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => { //this deletes all entries in the collection before the test is ran
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => { //the Header
    it('should create a new todo', (done) => {
        var text = 'Test todo text'; //text property of new todo

        request(app) //using supertest. Make a request passing in the app we want to make the request on.
            .post('/todos') //sets up a post request
            .send({text}) //need to actually send data. The object we pass in automatically gets converted to JSON by supertest.
            .expect(200) //we expect an OK status because we are sending valid data in this test case
            .expect((res) => { //custom expect to make sure the response's text property is equal to that of the one we gave it
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => { //Now we want to check what actually got stored in the mongodb collection
                if (err) { //if there were any errors such as non-200 status code, we want to wrap up the test
                    return done(err); //returning just stops the function execution
                }
                Todo.find().then((todos) => { //fetch all of the todos
                    expect(todos.length).toBe(1); //length will be one since we deleted everything before
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
})