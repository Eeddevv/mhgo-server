import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Like } from '../../likes/entities/like.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Table
export class Publication extends Model {
  @Column
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING)
  })
  images: string[];

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  creatorId: string;

  @BelongsTo(() => User)
  creator: User;

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Comment)
  comments: Comment[];
}