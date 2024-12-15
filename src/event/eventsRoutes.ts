import express from 'express';
import EventModel, { Event } from './event.model';
import UserModel from '../user/user.model';

const router = express.Router();

router.post('/events', async (req, res) => {
	try {
		const { organizer, ...eventData } = req.body;

		const newEvent = await EventModel.create({ organizer, ...eventData });
		res.status(201).json(newEvent);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/events', async (req, res) => {
	try {
		const events = await EventModel.find();
		res.json(events);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/events/:eventId', async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const event = await EventModel.findById(eventId);

		if (!event) {
			return res.status(404).json({ message: 'Événement non trouvé.' });
		}

		res.json(event);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.put('/events/:eventId', async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const eventData = req.body;

		const existingEvent = await EventModel.findById(eventId);

		if (!existingEvent) {
			return res.status(404).json({ message: 'Événement non trouvé.' });
		}

		if (existingEvent.organizer.toString() !== eventData.organizer) {
			return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cet événement." });
		}

		const updatedEvent = await EventModel.findByIdAndUpdate(eventId, eventData, { new: true });
		res.json(updatedEvent);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/events/:eventId', async (req, res) => {
	try {
		const eventId = req.params.eventId;

		const existingEvent = await EventModel.findById(eventId);

		if (!existingEvent) {
			return res.status(404).json({ message: 'Événement non trouvé.' });
		}

		if (existingEvent.organizer.toString() !== req.body.organizer) {
			return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cet événement." });
		}
		await EventModel.findByIdAndDelete(eventId);
		res.json({ message: 'Événement supprimé avec succès.' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
