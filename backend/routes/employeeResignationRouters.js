import { Router } from 'express';
import { employeeResignation } from '../models/employeeResignationModel.js';
const router = Router();

// Create EmployeeResignation
router.post('/', async (req, res) => {
  try {
    const EmployeeResignation = new employeeResignation(req.body);
    await EmployeeResignation.save();
    res.status(201).json(EmployeeResignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All EmployeeResignations
router.get('/', async (req, res) => {
  try {
    const EmployeeResignations = await employeeResignation.find();
    res.json(EmployeeResignations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:_id', async (req, res) => {
  try {
    const EmployeeResignation = await employeeResignation.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(EmployeeResignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete EmployeeResignation
router.delete('/:_id', async (req, res) => {
  try {
    await employeeResignation.findByIdAndDelete(req.params._id);
    res.json({ message: 'EmployeeResignation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
