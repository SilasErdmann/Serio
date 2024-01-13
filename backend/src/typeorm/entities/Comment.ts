import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Media } from './Media';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column()
  mediaId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Media, (media) => media.comments)
  media: Media;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}