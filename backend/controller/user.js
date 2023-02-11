const db = require('../database');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const key = 'ticproject';
const saltRounds = 10;

const controller = {
    register: async (req, res) => {
        let data = req.body;
        let existingEmail = false;

        const existingUser = db.collection('users');
        const snapshot = await existingUser.where('email', '==', data.email).get();

        if (!snapshot.empty) {
            existingEmail = true;
        };

        if (existingEmail) {
            res.send(`User with email ${data.email} already registered!`)
        }
        else {
            bcrypt.hash(data.password, saltRounds).then(async (hash) => {
                data.password = hash;
                const authorizedEmail = data.email;

                if (authorizedEmail.includes('system')) {
                    data.role = 'admin';
                }
                else {
                    data.role = 'user';
                }

                const userRef = await db.collection('users').add(data);
                res.send('Succesful registration!');
            });
        }
    },

    login: async (req, res) => {
        let data = req.body;
        let existingEmail = false;

        const users = db.collection('users');
        const snapshot = await users.where('email', '==', data.email).get();
        let response = {};

        if (snapshot.empty) {
            response.message = "The email address you entered is not valid!";
            res.send(response);

        }
        else {
            existingEmail = true;
            snapshot.forEach(doc => {
                bcrypt.compare(data.password, doc.data().password).then(async (result) => {

                    if (result) {
                        let token = jwt.sign({
                            email: doc.data().email
                        }, key);

                        const user = { id: doc.id, ...doc.data() }
                        response.token = token;
                        response.user = user;

                        const authorizedUser = doc.data().role;
                        if (authorizedUser.includes('admin'))
                            response.message = 'You are allowed to access private resources!';
                        res.send(response);
                    }
                    else {
                        response.message = "Password missmatch!";
                        res.status(403).send(response);
                    }
                });
            });
        }
    }
}

module.exports = controller;