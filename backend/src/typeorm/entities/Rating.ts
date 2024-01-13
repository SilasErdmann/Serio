import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Media } from './Media';
import { User } from './User';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint' })
  rating: number;

  @Column()
  mediaId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Media, (media) => media.ratings)
  media: Media;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}