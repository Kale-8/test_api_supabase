import {db} from '../config/db.js';

export const getEnrollments = (req, res) => {
    db.query('SELECT * FROM public.enrollments', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results.rows);
    });
};

export const addEnrollment = (req, res) => {
    const {event_id, user_id} = req.body;
    db.query('INSERT INTO public.enrollments (event_id, user_id) VALUES ($1, $2)', [event_id, user_id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Enrollment added'});
    });
};