import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Media_Genre } from './Media_Genre';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Media_Genre, (media_genre) => media_genre.genre)
  media_genres: Media_Genre[];
}