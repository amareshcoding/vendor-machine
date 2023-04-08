import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/EmployeeModel.js';

const register = async (req, res) => {
  try {
    const {
      employeeName,
      companyName,
      email,
      cardNo,
      contactNo,
      department,
      password,
    } = req.body;

    const isEmployeeExist = await Employee.findOne({ email: email });
    if (isEmployeeExist)
      return res
        .status(400)
        .send('Email Already Exists, Try with another Email');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      employeeName,
      companyName,
      email,
      cardNo,
      contactNo,
      department,
      password: passwordHash,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      _id: savedEmployee._id,
      employeeName: savedEmployee.employeeName,
      companyName: savedEmployee.companyName,
      email: savedEmployee.email,
      cardNo: savedEmployee.cardNo,
      contactNo: savedEmployee.contactNo,
      department: savedEmployee.department,
      isDeleted: savedEmployee.isDeleted,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email: email, isDeleted: false });
    if (!employee)
      return res.status(400).json({ message: 'Employee does not exist!' });

    const isMatched = await bcrypt.compare(password, employee.password);
    if (!isMatched)
      return res.status(400).json({ message: 'Invalid credentials!' });

    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET);

    res.status(200).json({
      employee: {
        _id: employee._id,
        employeeName: employee.employeeName,
        companyName: employee.companyName,
        email: employee.email,
        cardNo: employee.cardNo,
        contactNo: employee.contactNo,
        department: employee.department,
        isDeleted: employee.isDeleted,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    employeeName,
    companyName,
    email,
    cardNo,
    contactNo,
    department,
    password,
  } = req.body;
  try {
    const isEmployeeExist = await Employee.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!isEmployeeExist) return res.status(400).send('User Does not Exists');

    var passwordHash;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const newUser = {
      employeeName,
      companyName,
      email,
      cardNo,
      contactNo,
      department,
      password,
      password: passwordHash,
    };

    const savedEmployee = await Employee.findByIdAndUpdate(id, newUser);
    const token = jwt.sign({ _id: savedEmployee._id }, process.env.JWT_SECRET);

    res.status(200).json({
      employee: {
        _id: savedEmployee._id,
        employeeName: savedEmployee.employeeName,
        companyName: savedEmployee.companyName,
        email: savedEmployee.email,
        cardNo: savedEmployee.cardNo,
        contactNo: savedEmployee.contactNo,
        department: savedEmployee.department,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, { isDeleted: true });
    if (!employee) {
      return res.status(404).json({ message: 'No Employee Found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { register, login, update, deleteEmployee };
