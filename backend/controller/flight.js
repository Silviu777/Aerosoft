const database = require('../database');

const controller = {
    getFlights: async (req, response) => {
        let flights = [];
        database.collection('airlines').doc(req.params.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data().flights;
                data.flightsList.forEach(item => {

                    let flight = {
                        airlineId: item.airlineId,
                        flightNumber: item.flightNumber,
                        date: new Date(item.date._seconds * 1000),
                        origin: item.origin,
                        destination: item.destination
                    };
                    flights.push(flight);
                });
            }
            response.json(flights);
        });


        // collection.forEach(doc => {
        //     let flight = {

        //         airline: doc.data().airline,
        //         date: new Date(doc.data().date._seconds * 1000),
        //         destination: doc.data().destination,
        //         flightLength: doc.data().flightLength,
        //         flightNumber: doc.data().flightNumber,
        //         origin: doc.data().origin

        //     };
        //     flights.push(flight);
        // });
        // response.json(flights);

    },

    getFlight: async (req, res) => {

        database.collection('airlines').doc(req.params.id).get().then(function (doc) {
            let flight = '';
            if (doc.exists) {
                let data = doc.data().flights;
                let flightsList = data.flightsList
                flightsList.forEach(item => {

                    if (item.flightNumber == req.params.flightNo) {
                        flight = {
                            airlineId: item.airlineId,
                            flightNumber: item.flightNumber,
                            date: new Date(item.date._seconds * 1000),
                            origin: item.origin,
                            destination: item.destination
                        };
                    }
                });
                res.json(flight);
            }
        })
    },

    addFlight: async (req, res) => {
        let newFlight = req.body

        database.collection('airlines').doc(req.params.id).get().then(function (doc) {

            if (doc.exists) {
                let data = doc.data().flights;
                if (Object.keys(data).length > 0) {
                    let flightsList = data.flightsList
                    let flightNumberExists = false;

                    flightsList.forEach(item => {

                        if (item.flightNumber == newFlight.flightNumber) {
                            flightNumberExists = true;
                            res.status(409).send('Flight already registered in the system!');
                        }
                    });

                    if (!flightNumberExists) {
                        newFlight.date = new Date(newFlight.date);
                        flightsList.push(newFlight);

                        res.status(201).send(`Flight ${newFlight.flightNumber} registered successfully!`);
                        database.collection('airlines').doc(req.params.id).update({
                            flights: { flightsList }
                        });
                    }
                }

                else {
                    let flightsList = [];
                    newFlight.date = new Date(newFlight.date);
                    flightsList.push(newFlight);

                    res.status(201).send(`Flight ${newFlight.flightNumber} registered successfully!`);
                    database.collection('airlines').doc(req.params.id).update({
                        flights: { flightsList }
                    });
                }
            }
        })
    },

    updateFlight: async (req, res) => {
        database.collection('airlines').doc(req.params.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data().flights;
                let flightsList = data.flightsList
                flightsList.forEach(item => {

                    if (item.flightNumber == req.params.flightNo) {

                        let flight = {
                            flightNumber: req.body.flightNumber,
                            date: new Date(req.body.date),
                            origin: req.body.origin,
                            destination: req.body.destination
                        };

                        flightIndex = flightsList.findIndex((obj => obj.flightNumber == req.params.flightNo));
                        flightsList[flightIndex] = flight
                        res.status(202).send((`Data for flight ${flight.flightNumber} updated succesfully!`));

                        database.collection('airlines').doc(req.params.id).update({
                            flights: { flightsList }
                        })
                    }

                });
            }
        })
    },

    deleteFlight: async (req, res) => {

        database.collection('airlines').doc(req.params.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data().flights;
                let flightsList = data.flightsList
                flightsList.forEach(item => {

                    if (item.flightNumber == req.params.flightNo) {
                        flightIndex = flightsList.findIndex((obj => obj.flightNumber == req.params.flightNo));
                        flightsList.splice(flightIndex, 1)
                    }
                });

                res.status(200).send(`Flight ${req.params.flightNo} has been removed!`);
                database.collection('airlines').doc(req.params.id).update({
                    flights: { flightsList }
                })
            }
        })
    }
}

module.exports = controller;