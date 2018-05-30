let userData = require('./userData.json');

module.exports = {
    get_users: (req, res, next) => {
        const { age, lastname, email, favorites } = req.query
        let response = []
        
        if(age) {
            console.log(age)
            response = userData.filter( user => user.age < age);
        
        } else if(lastname) {
            response = userData.filter( user => user.last_name === lastname);
        
        } else if(email) {
            response = userData.filter( user => user.email === email);
        
        } else if(favorites) {
            response = userData.filter( user => user.favorites.includes(favorites));
        
        } else {
            response = userData;
        }

        res.status(200).send(response)
    },

    get_byId: (req, res, next) => {
        const { userId } = req.params;
        let userArray = userData.filter( user => user.id == +userId );
        
        userArray.length > 0
            ? res.status(200).send(userArray[0])
            : res.status(404).json(null)
    },

    get_admins: (req, res, next) => {
        res.status(200).send(userData.filter( user => user.type === 'admin'));
    },

    get_nonAdmins: (req, res, next) => {
        res.status(200).send(userData.filter( user => user.type !== 'admin'));
    },

    get_userType: (req, res, next) => {
        const { userType } = req.params;

        res.status(200).send(userData.filter( user => user.type === userType));
    },

    update_user: (req, res, next) => {
        const { userId } = req.params
            , { body } = req;

        for(let i = 0; i < userData.length; i++) {
            if(userData[i].id === +userId) {
                userData[i] = body;
                res.status(200).send(userData);
            }
        }
    },

    create_user: (req, res, next) => {
        const { body } = req
            , newId = userData[userData.length-1].id + 1;
        let newUser = Object.assign({}, body, {id: newId})
        userData.push(newUser);

        res.status(200).send(userData);
    },

    delete_user: (req, res, next) => {
        const { userId } = req.params;

        userData.forEach( (user, i) => {
            if(user.id === +userId) {
                userData.splice(i, 1);
                res.status(200).send(userData);
            }
        })
    }
}