const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , uc = require('./usersCtrl');

app.use(bodyParser());

app.get('/api/users', uc.get_users);
app.get('/api/users/:userId', uc.get_byId);
app.get('/api/admins', uc.get_admins);
app.get('/api/nonadmins', uc.get_nonAdmins);
app.get('/api/user_type/:userType', uc.get_userType);

app.put('/api/users/:userId', uc.update_user)

app.post('/api/users', uc.create_user);

app.delete('/api/users/:userId', uc.delete_user);

app.listen(3000, () => { console.log('Ye olde server doth lend an ear at porte 3000, melord!')})