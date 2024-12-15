import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import eventsRoutes from './event/eventsRoutes';
import usersRoutes from './user/usersRoutes';
import UserModel from './user/user.model';
import bodyParser from 'body-parser';
const { auth } = require('express-oauth2-jwt-bearer');
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());
const checkJwt = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});
app.use(checkJwt);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
mongoose.connection.on('connected', () => {
	console.log('connected to database');
});
mongoose.connection.on('error', (err) => {
	console.log(`error connecting to database`, err);
});

app.use('/api', eventsRoutes);
app.use('/api', usersRoutes);

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});

const updateUsersConnection = async () => {
	try {
		await UserModel.updateMany({}, { isConnected: false });
		console.log('All users have been automatically disconnected.');
	} catch (error) {
		console.error("Error updating users' connection:", error);
	}
};

cron.schedule('0 0 */3 * *', updateUsersConnection);
