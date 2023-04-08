import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'Name is too short!'],
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cardNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 12,
    },
    contactNo: {
      type: String,
      required: true,
      min: [10, 'Phone number should contain at least ten digits!'],
      trim: true,
    },
    department: {
      type: String,
      enum: ['IT', 'Management'],
      default: 'Management',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
