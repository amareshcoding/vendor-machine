import Machine from '../models/MachineModal.js';

const createMachine = async (req, res) => {
  const { companyName, description, installLocation } = req.body;
  try {
    const newMachine = await Machine.create({
      companyName,
      description,
      installLocation,
    });
    res.status(201).send(newMachine);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getOneMachine = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findById({
      _id: id,
      isDeleted: { $eq: false },
    });
    if (!machine) {
      return res.status(404).json({ message: 'No Machine Found' });
    }
    res.status(200).send(machine);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMachine = async (req, res) => {
  try {
    const machine = await Machine.find({ isDeleted: { $eq: false } });
    res.status(200).send(machine);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateMachine = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const newMachine = await Machine.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!newMachine) {
      return res.status(404).json({ message: 'No Machine Found' });
    }
    res.status(200).send(newMachine);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteMachine = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findByIdAndUpdate(id, { isDeleted: true });
    if (!machine) {
      return res.status(404).json({ message: 'No Machine Found' });
    }
    res.status(200).json({ message: 'Machine deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  createMachine,
  getOneMachine,
  getAllMachine,
  updateMachine,
  deleteMachine,
};
