import express from 'express';
import {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent
} from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;