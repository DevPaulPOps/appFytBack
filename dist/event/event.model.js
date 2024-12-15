"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// event.model.ts
const mongoose_1 = require("mongoose");
const sports_model_1 = require("../sport/sports.model");
const EventSchema = new mongoose_1.Schema({
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
        adress: { type: String, required: false },
    },
    organizer: { type: String, required: true },
    sport: sports_model_1.sportSchema,
    date: { type: Date, required: true },
    description: { type: String, required: true },
});
EventSchema.index({ location: '2dsphere' });
const EventModel = (0, mongoose_1.model)('Event', EventSchema);
exports.default = EventModel;
