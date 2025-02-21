import { InferCreationAttributes, InferAttributes } from "sequelize";
import { Column, Model, Table, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  balance: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
