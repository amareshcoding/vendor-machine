import mongoose from 'mongoose';

const MachineSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: 'New Card',
      trim: true,
    },
    installLocation: {
      type: String,
      default: 'Bangalore',
      trim: true,
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

const Machine = mongoose.model('Machine', MachineSchema);
export default Machine;
