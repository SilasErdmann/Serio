import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Season } from './Season';


@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'tinyint' })
  number: number;

  @Column()
  name: string;

  @Column({ type:'text' })
  description: string;

  @Column({ type:'smallint' })
  runtime: number;

  @Column()
  seasonId: number;

  @ManyToOne(() => Season, (season) => season.episodes)
  season: Season;

}