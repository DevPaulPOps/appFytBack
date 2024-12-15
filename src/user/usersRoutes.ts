import express from 'express';
import UserModel from './user.model';

const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const users = await UserModel.find();
		res.json(users);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});
router.get('/user', async (req, res) => {
	try {
		const { pseudo } = req.query;
		const user = await UserModel.findOne({ pseudo });
		res.json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/user/connection', async (req, res) => {
	try {
		const { pseudo } = req.query;
		const user = await UserModel.findOne({ pseudo });

		if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé.' });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/users', async (req, res) => {
	try {
		const { pseudo } = req.body;

		const existingUser = await UserModel.findOne({ pseudo });

		if (existingUser) {
			await existingUser.save();
			return res.status(200).json(existingUser);
		}

		const newUser = await UserModel.create({ pseudo });
		res.status(201).json(newUser);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.post('/logout', async (req, res) => {
	try {
		const { pseudo } = req.body;

		const user = await UserModel.findOne({ pseudo });

		if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé.' });
		}

		await user.save();

		res.json({ message: 'Déconnexion réussie.' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
