import {db} from '../config/db.js';

export const getEvents = (req, res) => {
    db.query('SELECT * FROM public.events', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results.rows);
    });
};

export const getEvent = (req, res) => {
    db.query('SELECT * FROM public.events WHERE id = $1', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result.rows);
    });
};

export const addEvent = (req, res) => {
    const {name, description, date, capacity} = req.body;
    db.query('INSERT INTO public.events (name, description, date, capacity) VALUES ($1, $2, $3, $4)', [name, description, date, capacity], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Event added'});
    });
};

export const updateEvent = (req, res) => {
    const {name, description, date, capacity} = req.body;
    db.query('UPDATE public.events SET name = $1, description = $2, date = $3, capacity = $4 WHERE id = $5', [name, description, date, capacity, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Event updated'});
    });
};

export const deleteEvent = (req, res) => {
    db.query('DELETE FROM public.events WHERE id = $1', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Event deleted'});
    });
};