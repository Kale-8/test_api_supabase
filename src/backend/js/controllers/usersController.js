import {db} from '../config/db.js';

export const getEmployees = (req, res) => {
    db.query('SELECT * FROM public.empleados', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results.rows);
    });
};

export const addEmployee = (req, res) => {
    const {nombre, apellido, departamento, edad, salario, fecha_ingreso} = req.body;
    db.query('INSERT INTO public.empleados (nombre, apellido, departamento, edad, salario, fecha_ingreso) VALUES (?, ? ,?, ?, ?, ?)', [nombre, apellido, departamento, edad, salario, fecha_ingreso], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Empleado agregado'});
    });
};

export const updateEmployee = (req, res) => {
    const {nombre, apellido, departamento, edad, salario, fecha_ingreso} = req.body;
    db.query('UPDATE public.empleados SET nombre = ?, apellido = ?, departamento = ?, edad = ?, salario = ?, fecha_ingreso = ? WHERE id = ?', [nombre, apellido, departamento, edad, salario, fecha_ingreso, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Empleado actualizado'});
    });
};

export const deleteEmployee = (req, res) => {
    db.query('DELETE FROM public.empleados WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({message: 'Empleado eliminado'});
    });
};