import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Publication } from '../../publications/entities/publication.entity';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Table
export class Like extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Comment)
  @Column
  commentId: number;

  @ForeignKey(() => Publication)
  @Column
  publicationId: number;

  @BelongsTo(() => User)
  user: User;
}
