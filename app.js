const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const express = require('express');
const sessions = require('express-sessions');
const MongoStore = require('connect-mongodb-session')(session);
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');
const handlebars = require('express-handlebars');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const Ajv = require('ajv');
const ajv = new Ajv({useDefaults: true});
const accessLogStreamWriter = fs.createWriteStream(path.join(__dirname, 'logs','access.log'), {flags: 'a'});
app.use(cors());
app.use(logger('combined',{stream: accessLogStreamWriter}));
app.use(express.json());
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

let store = new MongoStore({
    uri: getDbUri(config.mongodbConnectingString),
    collection: 'sessions'
})

let ajvtest = ajv.validate(require('./config/ajvSchema.json'), require('./config/ajvtest.json'))
console.log('ajv test result', ajvtest);
app.get('/',(req,res)=>{
    res.render('home');
})

app.use('/app',routes);

app.listen(3000, ()=>{
    console.log('server started on port 3000');
})