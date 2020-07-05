const MongoClient = require('mongodb').MongoClient;
const mongodbUri = require('mongodb-uri');

let _db;

function initDb(dbUrl, callback){
    if(_db){
        console.warn('Trying to init db again');
        return callback(null, _db);;
    }

    MongoClient.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, connected);
    function connected(err, client){
        if(err){
            console.log('Failed to connect to db', err);
            return callback(err);
        }

        dbUrl = getDbUri(dbUrl);
        const dbUriObject = mongodbUri.parse(dbUrl);
        const db = client.db(dbUriObject.database);

        db.users = db.collection('users');

        _db = db;
        return callback(null, db);
    }

}

function getDbUri(dbUrl){
    const dbUriObject = mongodbUri.parse(dbUrl);
    if(process.env.NODE_ENV === 'test'){
        dbUriObj.database = 'expresscart-test';
    }
    else{
        dbUriObj.database = 'expresscart-pro';
    }
    return mongodbUri.format(dbUriObject);
}

function getDb(){
    return _db;
}

module.exports = {
    initDb,
    getDb,
    getDbUri
}