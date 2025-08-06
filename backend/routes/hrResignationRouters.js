import { Router } from 'express';
import { hrResignation } from '../models/hrResignationModel.js';
const router = Router();

// Create HrResignation
router.post('/', async (req, res) => {
  try {
    const HrResignation = new hrResignation(req.body);
    await HrResignation.save();
    res.status(201).json(HrResignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All HrResignations
router.get('/', async (req, res) => {
  try {
    const HrResignations = await hrResignation.find();
    res.json(HrResignations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update HrResignation
// router.put('/:_id', async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (status !== 'Approved' && status !== 'Rejected') {
//       return res.status(400).json({ message: "Invalid status. Status must be 'Approved' or 'Rejected'." });
//     }

//     const updatedHrResignation = await hrResignation.findByIdAndUpdate(
//       req.params._id,
//       { status },  // Update the leave request status
//       { new: true }  // Return the updated leave request document
//     );

//     if (!updatedHrResignation) {
//       return res.status(404).json({ message: "Leave request not found." });
//     }

//     res.json(updatedHrResignation);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.put('/:_id', async (req, res) => {
  try {
    const HrResignation = await hrResignation.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(HrResignation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete HrResignation
router.delete('/:_id', async (req, res) => {
  try {
    await hrResignation.findByIdAndDelete(req.params._id);
    res.json({ message: 'HrResignation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
