const database = require('../database');
const firestore = require('firebase-admin').firestore;

const controller = {
    getAirlines: async (request, response) => {
        let airlines = [];
        const collection = await database.collection('airlines').get();

        collection.forEach(doc => {
            let airline = {
                id: doc.data().id,
                name: doc.data().name,
                founded: new Date(doc.data().founded._seconds * 1000),
                destinations: doc.data().destinations,
                fleetSize: doc.data().fleetSize,
                homebase: doc.data().homebase,
                flights: doc.data().flights

            };
            airlines.push(airline);
        });
        response.json(airlines);
    },

    getAirline: async (req, res) => {

        const airlineRef = database.collection('airlines').doc(req.params.id);
        const airline = await airlineRef.get();

        if (!airline.exists) {
            res.status(404).send(`Airline with id ${req.params.id} not found!`)
        }
        else {
            let retrievedAirline = {
                id: airline.data().id,
                name: airline.data().name,
                founded: new Date(airline.data().founded._seconds * 1000),
                destinations: airline.data().destinations,
                fleetSize: airline.data().fleetSize,
                homebase: airline.data().homebase,
                flights: airline.data().flights
            };
            res.status(200).send(retrievedAirline);
        }
    },

    addAirline: async (req, res) => {
        let registeredAirline = false;
        let newAirline = req.body;

        const airlineRef = database.collection('airlines');
        const airline = await airlineRef.where('id', '==', newAirline.id).get();

        if (!airline.empty) {
            registeredAirline = true;
        }

        if (registeredAirline) {
            res.status(409).send('Airline already registered in the system!');
        }
        else {
            newAirline.founded = new Date(newAirline.founded)
            const airlineAdded = await airlineRef.doc(`${newAirline.id}`).set(newAirline);
            res.status(201).send(`Airline ${newAirline.name} registered successfully!`);
        }
    },

    updateAirline: async (req, res) => {
        const airlineRef = database.collection('airlines').doc(req.params.id);
        const airline = await airlineRef.get();

        if (airline.exists) {
            await airlineRef.update({
                name: req.body.name,
                founded: new Date(req.body.founded),
                destinations: req.body.destinations,
                fleetSize: req.body.fleetSize,
                homebase: req.body.homebase
            });
            res.status(202).send((`Data for airline with id ${req.params.id} updated succesfully!`));
        }
        else {
            res.status(404).send(`Airline with id ${req.body.id} could not be found!`);
        }
    },

    deleteAirline: async (req, res) => {
        const airlineRef = database.collection('airlines').doc(req.params.id);

        if (!airlineRef.empty) {
            try {
                airlineRef.delete();
                res.send(`Airline with id ${req.params.id} has been removed!`)
            }
            catch (err) {
                res.send({ status: "Error occured!", error: err });
            }
        }
        else {
            res.send(`Airline with id ${req.params.id} could not be found!`)
        }
    }
}

module.exports = controller;