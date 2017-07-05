var env = process.env.NODE_ENV || 'development'; //this is set on Heroku by default. We need to configure the other environments in package.json
//We did not set NODE_ENV for our dev env so it will get the default value of env which is 'development'
if(env === 'development'){
    process.env.PORT = 3000; //localhost 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

/*IN PACKAGE.JSON 
"test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**//*.test.js" the export is for mac and linux, SET is for windows. On windows we still need the first one
                                                                    //because heroku uses linux. Now we can set our NODE_ENV variable for our test env
*/
