import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Subscription } from '../subscriptions/subscription.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  birthday: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @HasMany(() => Subscription, 'followerId')
  following: Subscription[];

  @HasMany(() => Subscription, 'followeeId')
  followers: Subscription[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
