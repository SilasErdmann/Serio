import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Media } from './Media';
import { User } from './User';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  addedDate: Date;

  @Column()
  mediaId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Media, (media) => media.watchlists)
  media: Media;

  @ManyToOne(() => User, (user) => user.watchlists)
  user: User;
}