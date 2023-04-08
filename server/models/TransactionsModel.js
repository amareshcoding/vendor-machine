import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Machine',
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    slotName: {
      type: String,
      default: 'A2',
    },
    cardNo: String,
    transactionStatus: {
      type: Boolean,
      default: true,
    },
    employeeName: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      enum: ['IT', 'Management'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
