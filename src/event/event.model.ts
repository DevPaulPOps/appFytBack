// event.model.ts
import { Document, Schema, model } from 'mongoose';
import { User } from '../user/user.model';
import { Sport, sportSchema } from '../sport/sports.model';
export interface Event extends Document {
	location: {
		type: string;
		coordinates: number[];
		adress: string;
	};
	organizer: string;
	sport: Sport;

	date: Date;
	description: string;
}

const EventSchema = new Schema<Event>({
	location: {
		type: { type: String, enum: ['Point'], default: 'Point' },
		coordinates: { type: [Number], required: true },
		adress: { type: String, required: false },
	},
	organizer: { type: String, required: true },
	sport: sportSchema,
	date: { type: Date, required: true },
	description: { type: String, required: true },
});

EventSchema.index({ location: '2dsphere' });

const EventModel = model<Event>('Event', EventSchema);

export default EventModel;
