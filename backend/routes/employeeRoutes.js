import { Router } from 'express';
import Employee from '../models/employeeModel.js';

const router = Router();

// Create Employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Employee
// PUT /:_id - General-purpose update
router.put('/:_id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true, runValidators: true } // return new doc, validate input
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.put('/:_id', async (req, res) => {
//   try {
//     const employees = await Employee.findByIdAndUpdate(req.params._id, req.body, { new: true });
//     res.json(employees);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete Employee
router.delete('/:_id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params._id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

