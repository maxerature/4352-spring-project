import express from 'express'
import Config from '../config/enviormentVariables'
import Settings from '../settings.json'
import LoginController from '../controllers/login'

export const HomeRoutes = express.Router()

HomeRoutes.get('/', async (req, res, next) => {
	res.send({
		name: Settings.ProjectName,
		version: Settings.ProjectVersion,
		port: Config.server.PORT
	})
})

HomeRoutes.post('/login', LoginController.login)

// Add routes using above syntax