const database = require('../database');
const firestore = require('firebase-admin').firestore;
const fieldValue = require('firebase-admin').firestore.FieldValue;

const controller = {
    getPilots: async (request, response) => {
        let pilots = [];
        const collection = await database.collection('pilots').get();

        collection.forEach(doc => {
            let pilot = {
                id: doc.data().id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                hiringDate: new Date(doc.data().hiringDate._seconds * 1000),
                age: doc.data().age,
                phoneNumber: doc.data().phoneNumber,
                homebase: doc.data().homebase

            };
            pilots.push(pilot);
        });
        response.json(pilots);
    },

    getPilot: async (req, res) => {

        const pilotRef = database.collection('pilots').doc(req.params.id);
        const pilot = await pilotRef.get();

        if (!pilot.exists) {
            res.status(404).send(`Pilot with id ${req.params.id} not found!`)
        }
        else {
            let retrievedPilot = {
                id: pilot.data().id,
                firstName: pilot.data().firstName,
                lastName: pilot.data().lastName,
                hiringDate: new Date(pilot.data().hiringDate._seconds * 1000),
                age: pilot.data().age,
                phoneNumber: pilot.data().phoneNumber,
                homebase: pilot.data().homebase
            };
            res.status(200).send(retrievedPilot);
        }
    },

    addPilot: async (req, res) => {
        let enrolledPilot = false;
        let newPilot = req.body;

        const pilotRef = database.collection('pilots');
        const pilot = await pilotRef.where('id', '==', newPilot.id).get();

        if (!pilot.empty) {
            enrolledPilot = true;
        }

        if (enrolledPilot) {
            res.status(404).send('Pilot already registered in the system!');
        }
        else {
            newPilot.hiringDate = firestore.Timestamp.fromDate(new Date(newPilot.hiringDate))
            const pilotAdded = await pilotRef.doc(`${newPilot.id}`).set(newPilot);
            res.status(201).send(`Pilot ${newPilot.firstName + ' ' + newPilot.lastName} registered successfully!`);
        }
    },

    updatePilot: async (req, res) => {
        const pilotRef = database.collection('pilots').doc(req.params.id);
        const pilot = await pilotRef.get();

        if (pilot.exists) {
            await pilotRef.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                hiringDate: new Date(req.body.hiringDate),
                age: req.body.age,
                phoneNumber: req.body.phoneNumber,
                homebase: req.body.homebase
            });
            res.status(202).send((`Personal data for pilot with id updated succesfully!`));
        }
        else {
            res.status(404).send(`Pilot with id ${req.body.id} could not be found!`);
        }
    },

    deletePilot: async (req, res) => {
        const pilotRef = database.collection('pilots').doc(req.params.id);

        if (!pilotRef.empty) {
            try {
                pilotRef.delete();
                res.send(`Pilot with id ${req.params.id} has been removed!`)
            }
            catch (err) {
                res.send({ status: "Error occured!", error: err });
            }
        }
        else {
            res.send(`Pilot with id ${req.params.id} could not be found!`)
        }
    }
}

module.exports = controller;