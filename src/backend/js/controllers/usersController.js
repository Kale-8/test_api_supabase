import {db} from '../config/db.js';

export const addUser = (req, res) => {
    const {name, email, password, role} = req.body;
    db.query('INSERT INTO public.users (name, email, password, role) VALUES ($1, $2, $3, $4)', [name, email, password, role], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'User added'});
    });
};