import Employee from '../models/EmployeeModel.js';
import Machine from '../models/MachineModal.js';
import Transaction from '../models/TransactionsModel.js';

const registerNewTransaction = async (req, res) => {
  const { machineId } = req.params;
  const { cardNo, slot } = req.body;

  try {
    //is Valid Machine
    const findMachine = await Machine.findById(machineId);

    //find Employee By CardNo
    const findEmployeeByCardNo = await Employee.findOne({
      cardNo: cardNo,
      isDeleted: false,
    });

    //failed transaction
    if (!findEmployeeByCardNo) {
      const newTransaction = {
        machineId,
        cardNo,
        slotName: slot,
        transactionStatus: false,
      };
      const transaction = await Transaction.create(newTransaction);
      return res
        .status(201)
        .json({ message: 'Failed Transaction', transaction });
    }

    //success transaction
    const newTransaction = {
      machineId,
      cardNo,
      slotName: slot,
      employeeId: findEmployeeByCardNo._id,
      employeeName: findEmployeeByCardNo.employeeName,
      department: findEmployeeByCardNo.department,
    };

    const transaction = await Transaction.create(newTransaction);
    res.status(201).json({ message: 'Transaction Success', transaction });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//  user can filter and search transactions with machineId , employee's cardNo and Date or transaction.
//db.posts.find({ '$where': 'this.created_on.toJSON().slice(0, 10) == "2012-07-14"' })

const getTransactions = async (req, res) => {
  const { machineId, cardNo, date, failed } = req.query;

  try {
    let transactions;

    if (failed) {
      transactions = await Transaction.find({
        transactionStatus: { $eq: false },
        isDeleted: { $eq: false },
      }).populate('machineId');
      res.status(200).send(transactions);
      return;
    }

    if (machineId && cardNo) {
      transactions = await Transaction.find({
        machineId: machineId,
        cardNo: cardNo,
        transactionStatus: { $eq: true },
        isDeleted: { $eq: false },
      })
        .populate('machineId')
        .populate('employeeId', '-password');
    } else if (machineId) {
      transactions = await Transaction.find({
        machineId: machineId,
        transactionStatus: { $eq: true },
        isDeleted: { $eq: false },
      })
        .populate('machineId')
        .populate('employeeId', '-password');
    } else if (cardNo) {
      transactions = await Transaction.find({
        cardNo: cardNo,
        transactionStatus: { $eq: true },
        isDeleted: { $eq: false },
      })
        .populate('machineId')
        .populate('employeeId', '-password');
    } else {
      transactions = await Transaction.find({
        isDeleted: { $eq: false },
      })
        .populate('machineId')
        .populate('employeeId', '-password');
    }

    if (date) {
      transactions = transactions.filter(
        (trans) => new Date(trans.createdAt).toLocaleDateString() == date
      );
    }

    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { registerNewTransaction, getTransactions };
