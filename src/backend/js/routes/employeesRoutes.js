import express from 'express';
import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} from '../controllers/employeesController.js';

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;