// comment.entity.ts
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { Publication } from '../../publications/entities/publication.entity';
import { Like } from '../../likes/entities/like.entity';

@Table
export class Comment extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Publication)
  @Column
  entityId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Like)
  likes: Like[];

  @Column
  content: string;
}
