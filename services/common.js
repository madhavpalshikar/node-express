exports.login = (req, callback)=>{
    let user = {id: 1, username: 'test', password: 'test'}

    if(req.body.username===user.username && req.body.password===user.password){
        callback(null, {userID: user.id, name: user.Name});
    }
    else{
        callback({message: 'Invalid Login'}, null);
    }
}