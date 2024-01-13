import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Media } from './Media';
import { Episode } from './Episode';


@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'tinyint' })
  number: number;

  @Column({ type:'text', nullable:true })
  description: string;

  @Column()
  mediaId: number;

  @ManyToOne(() => Media, (media) => media.seasons)
  media: Media;

  @OneToMany(() => Episode, (episode) => episode.season)
  episodes: Episode[];

}