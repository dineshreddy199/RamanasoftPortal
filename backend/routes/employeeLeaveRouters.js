import { Router } from 'express';
import { employeeLeave } from '../models/emploeeLeaveModel.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const EmployeeLeave = new employeeLeave(req.body);
    await EmployeeLeave.save();
    res.status(201).json(EmployeeLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All EmployeeLeaves
router.get('/', async (req, res) => {
  try {
    const EmployeeLeaves = await employeeLeave.find();
    res.json(EmployeeLeaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update EmployeeLeave
// router.put('/:_id', async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (status !== 'Approved' && status !== 'Rejected') {
//       return res.status(400).json({ message: "Invalid status. Status must be 'Approved' or 'Rejected'." });
//     }

//     const updatedEmployeeLeaves = await employeeLeave.findByIdAndUpdate(
//       req.params._id,
//       { status },  // Update the leave request status
//       { new: true }  // Return the updated leave request document
//     );

//     if (!updatedEmployeeLeaves) {
//       return res.status(404).json({ message: "Leave request not found." });
//     }

//     res.json(updatedEmployeeLeaves);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.put('/:_id', async (req, res) => {
  try {
    const EmployeeLeave = await employeeLeave.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(EmployeeLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete EmployeeLeave
router.delete('/:_id', async (req, res) => {
  try {
    await employeeLeave.findByIdAndDelete(req.params._id);
    res.json({ message: 'EmployeeLeave deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
