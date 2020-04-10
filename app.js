const path = require('path');
const fs = require('fs');
const express = require('express');
const sessions = require('express-sessions');
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');
const handlebars = require('express-handlebars');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
app.use(cors());
app.use(express.json());
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.render('home');
})

app.use('/app',routes);

app.listen(3000, ()=>{
    console.log('server started on port 3000');
})