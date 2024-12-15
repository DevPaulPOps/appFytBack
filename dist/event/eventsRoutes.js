"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_model_1 = __importDefault(require("./event.model"));
const router = express_1.default.Router();
router.post('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { organizer } = _a, eventData = __rest(_a, ["organizer"]);
        const newEvent = yield event_model_1.default.create(Object.assign({ organizer }, eventData));
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.get('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.default.find();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/events/:eventId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const event = yield event_model_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.put('/events/:eventId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const eventData = req.body;
        const existingEvent = yield event_model_1.default.findById(eventId);
        if (!existingEvent) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        if (existingEvent.organizer.toString() !== eventData.organizer) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cet événement." });
        }
        const updatedEvent = yield event_model_1.default.findByIdAndUpdate(eventId, eventData, { new: true });
        res.json(updatedEvent);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.delete('/events/:eventId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const existingEvent = yield event_model_1.default.findById(eventId);
        if (!existingEvent) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        if (existingEvent.organizer.toString() !== req.body.organizer) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cet événement." });
        }
        yield event_model_1.default.findByIdAndDelete(eventId);
        res.json({ message: 'Événement supprimé avec succès.' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
