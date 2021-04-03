import express from 'express'
import Config from '../config/enviormentVariables'
import Settings from '../settings.json'
import LoginController from '../controllers/login'
import RegisterController from '../controllers/register'
import MProfileController from '../controllers/manageProfile'
import FuelQuoteController from '../controllers/fuelQuote'
import FuelRequestController from '../controllers/fuelQuoteRequest'
import FuelSubmitController from '../controllers/submitQuote'
import HistoryController from '../controllers/history'


export const HomeRoutes = express.Router()

HomeRoutes.get('/', async (req, res, next) => {
	res.send({
		name: Settings.ProjectName,
		version: Settings.ProjectVersion,
		port: Config.server.PORT
	})
})

HomeRoutes.post('/login', LoginController.login)

HomeRoutes.post('/register', RegisterController.register)

HomeRoutes.post('/manageProfile', MProfileController.manageProfile)

HomeRoutes.get('/manageProfile/:username', MProfileController.getProfile)

HomeRoutes.post('/quoteLoad', FuelQuoteController.populate)

HomeRoutes.post('/request', FuelRequestController.calculate)

HomeRoutes.post('/submit', FuelSubmitController.submitQuote)

HomeRoutes.post('/generateHistory', HistoryController.generateHistory)

// Add routes using above syntax
