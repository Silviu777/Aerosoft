const authController = require('../controller/user.js')
const pilotController = require('../controller/pilot.js')
const airlineController = require('../controller/airline.js')
const flightController = require('../controller/flight.js')


const router = require('express').Router();
const verifyAuthorization = require('../authorization/auth.js')
const adminAuthorization = require('../authorization/auth.js')

router.post('/login', authController.login);
router.post('/signup', authController.register);

router.get('/pilots', adminAuthorization, verifyAuthorization, pilotController.getPilots);
router.get('/pilots/:id', adminAuthorization, verifyAuthorization, pilotController.getPilot);
router.post('/pilots', adminAuthorization, verifyAuthorization, pilotController.addPilot);
router.patch('/pilots/edit/:id', adminAuthorization, verifyAuthorization, pilotController.updatePilot);
router.delete('/pilots/delete/:id', adminAuthorization, verifyAuthorization, pilotController.deletePilot);

router.get('/airlines', airlineController.getAirlines);
router.get('/airlines/:id', airlineController.getAirline);
router.post('/airlines', adminAuthorization, verifyAuthorization, airlineController.addAirline);
router.patch('/airlines/edit/:id', adminAuthorization, verifyAuthorization, airlineController.updateAirline);
router.delete('/airlines/delete/:id', adminAuthorization, verifyAuthorization, airlineController.deleteAirline);

router.get('/airlines/:id/flights', flightController.getFlights);
router.get('/airlines/:id/flights/:flightNo', flightController.getFlight);
router.post('/airlines/:id/flights', adminAuthorization, verifyAuthorization, flightController.addFlight);
router.patch('/airlines/:id/flights/:flightNo', adminAuthorization, verifyAuthorization, flightController.updateFlight);
router.delete('/airlines/:id/flights/:flightNo', adminAuthorization, verifyAuthorization, flightController.deleteFlight);


module.exports = router; 