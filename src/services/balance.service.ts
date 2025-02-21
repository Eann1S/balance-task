import { Request, Response } from "express";
import { User } from "../models/User";
import db from "../sequelize";

export async function updateBalance(req: Request, res: Response) {
  const transaction = await db.transaction();

  try {
    const { userId, amount } = req.body;
    const user = await User.findByPk(userId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!user) {
      await transaction.rollback();
      res.status(404).json({ error: "User not found" });
      return;
    }

    const newBalance = user.balance + amount;

    if (newBalance < 0) {
      await transaction.rollback();
      res.status(400).json({ error: "Insufficient funds" });
      return;
    }

    await user.update({ balance: newBalance }, { transaction });
    await transaction.commit();

    res.json({ balance: newBalance });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: (error as Error).message });
    return;
  }
};
