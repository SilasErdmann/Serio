import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Media } from './Media';
import { Genre } from './Genre';

@Entity()
export class Media_Genre {
  @PrimaryColumn()
  mediaId: number;

  @PrimaryColumn()
  genreId: number;

  @ManyToOne(() => Media, (media) => media.media_genres)
  media: Media;

  @ManyToOne(() => Genre, (genre) => genre.media_genres)
  genre: Genre;
}