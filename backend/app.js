const { randNumber, randFirstName, randLastName, randPhoneNumber,
    randCity, randPastDate, randAirline, randAirport, randBetweenDate, randFlightNumber, randFlightDetails } = require('@ngneat/falso');
const { Timestamp } = require('@firebase/firestore');

var cors = require('cors')
var morgan = require('morgan');
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const routes = require('./routing/routes');
const port = 8080;

app.use(cors({
    origin: '*'
}))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json());

var db = require('./database');

db.collection('pilots').get().then(snap => {
    size = snap.size;
    if (size < 10) {
        for (let i = 0; i <= 10; i++) {
            const pilotJson = {
                id: randNumber({ min: 10100, max: 99999 }),
                firstName: randFirstName(),
                lastName: randLastName(),
                hiringDate: randPastDate({ years: 25 }),
                age: randNumber({ min: 24, max: 65 }),
                phoneNumber: randPhoneNumber(),
                homebase: randCity()
            }
            db.collection("pilots").doc(`${pilotJson.id}`).set(pilotJson);
        }
    }
    else
        console.log('Collection loaded!');
});

db.collection('airlines').get().then(snap => {
    size = snap.size;
    snap.forEach(item => {

        const flightsList = []
        for (let i = 0; i <= randNumber({ min: 4, max: 7 }); i++) {
            const flightJson = {
                airlineId: item.data().id,
                flightNumber: randFlightNumber({ airline: item.data().name }),
                date: randBetweenDate({ from: new Date('2022-01-01'), to: new Date('2023-02-07') }),
                origin: randAirport(),
                destination: randAirport()
            }
            flightsList.push(flightJson)
        }

        // db.collection('airlines').doc(item.id).update({
        //     flights: { flightsList }
        // })
    })

    if (size < 8) {
        for (let i = 0; i <= 8; i++) {
            const airlineJson = {
                id: randNumber({ min: 1010, max: 9999 }),
                name: randAirline(),
                founded: randBetweenDate({ from: new Date('1930-05-01'), to: new Date('1990-12-23') }),
                destinations: randNumber({ min: 10, max: 125 }),
                fleetSize: randNumber({ min: 8, max: 150 }),
                homebase: randCity(),
            }

            db.collection("airlines").doc(`${airlineJson.id}`).set(airlineJson);
        }
    }
    // db.collection("airlines").doc(`${item.data().id}`).set(item.data())

});

db.collection('airlines').get().then(snap => {
    snap.forEach(item => {
        size = snap.size;

        const flights = item.ref.collection('flights');

        for (let i = 0; i <= randNumber({ min: 3, max: 8 }); i++) {
            const flightJson =

                randFlightDetails({ airline: item.data().name });

            flights.add(flightJson)
            db.collection("flights").doc(`${flightJson.flightNumber}`).set(flightJson);
        }
        db.collection("airlines").doc(`${item.data().id}`).set(item.data());

    });

});


app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is running on port ${port}... `)
});



module.exports = app;