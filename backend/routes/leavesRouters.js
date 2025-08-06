import { Router } from 'express';
import { hrLeave } from '../models/hrLeaveModel.js';
import { employeeLeave } from '../models/emploeeLeaveModel.js';

const router = Router();


// Create Leave (specify type in body)
router.post('/', async (req, res) => {
  try {
    const { type, ...leaveData } = req.body;
    let Model;

    if (type === 'hr') Model = hrLeave;
    else if (type === 'employee') Model = employeeLeave;
    else return res.status(400).json({ message: 'Invalid type' });

    const newLeave = new Model(leaveData);
    await newLeave.save();
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Leaves (concatenated from both models)
router.get('/', async (req, res) => {
  try {
    const [hrLeaves, employeeLeaves] = await Promise.all([
      hrLeave.find(),
      employeeLeave.find()
    ]);

    const allLeaves = hrLeaves.concat(employeeLeaves);
    res.json(allLeaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Leave by _id (search in both models)
router.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const [hrLeaves, employeeLeaves] = await Promise.all([
      hrLeave.find(),
      employeeLeave.find()
    ]);

    const allLeaves = hrLeaves.concat(employeeLeaves);
    const found = allLeaves.find(leave => leave._id.toString() === _id);

    if (!found) return res.status(404).json({ message: 'Leave not found' });

    const Model = hrLeaves.find(leave => leave._id.toString() === _id)
      ? hrLeave
      : employeeLeave;

    const updatedLeave = await Model.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Leave by _id (search in both models)
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const [hrLeaves, employeeLeaves] = await Promise.all([
      hrLeave.find(),
      employeeLeave.find()
    ]);

    const allLeaves = hrLeaves.concat(employeeLeaves);
    const found = allLeaves.find(leave => leave._id.toString() === _id);

    if (!found) return res.status(404).json({ message: 'Leave not found' });

    const Model = hrLeaves.find(leave => leave._id.toString() === _id)
      ? hrLeave
      : employeeLeave;

    await Model.findByIdAndDelete(_id);
    res.json({ message: 'Leave deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
