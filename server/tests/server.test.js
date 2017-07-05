//https://github.com/mjackson/expect
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//We are going to put these two todos into the database before each call after we remove all entries
//so that our get request actually gets something
//This is called seed data
const todos = [{
    _id: new ObjectID(),//so we can access the id in our test case
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => { //this deletes all entries in the collection before the test is ran
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
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
                Todo.find({text}).then((todos) => { //fetch all of the todos
                    expect(todos.length).toBe(1); //length will be one because we only get the entries that match our text property
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
                    expect(todos.length).toBe(2); //length will be 2 because all entires were deleted and we made 2 dummy entries
                    done();
                }).catch((e) => done(e));
            });
    });
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('Get /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) //toHexString converts the objectID to a string
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        //make sure you get a 404 back
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if given invalid object id', (done) => { //we specify (done) for async calls
        // /todos/123
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
         //grab id of first item
        //update text, set completed to true
        //ASSERTIONS
        //200
        //text is changed, completed is true, completedAt is a number .toBeA
        var originalText = todos[1].text;
        var hexId = todos[0]._id.toHexString();
        var updatedBody = {
            "text": "updating text in test",
            "completed": true
        }
        request(app)
            .patch(`/todos/${hexId}`)
            .send(updatedBody) 
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toNotBe(originalText);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item
        //update text, set completed to false
        //ASSERTIONS
        //200
        //text is changed, completed is false, compeltedAt is null .toNotExist
        var originalText = todos[1].text;
        var hexId = todos[1]._id.toHexString();
        var updatedBody = {
            "text": "updating text 2 in test",
            "completed": false
        }    
        request(app)
            .patch(`/todos/${hexId}`)
            .send(updatedBody) 
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toNotBe(originalText);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })   
            .end(done);
    });
});