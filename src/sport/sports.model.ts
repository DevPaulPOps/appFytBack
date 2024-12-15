import mongoose, { Schema, Document } from 'mongoose';
import { SportCategory } from './enum/enumSportCategory';
import { SportName } from './enum/enumSportName';

export interface Sport extends Document {
	category: SportCategory;
	name: SportName;
}

export const sportSchema = new Schema<Sport>({
	category: {
		type: String,
		enum: Object.values(SportCategory),
		required: true,
	},
	name: {
		type: String,
		enum: Object.values(SportName),
		required: true,
	},
});

export default mongoose.model<Sport>('Sport', sportSchema);
