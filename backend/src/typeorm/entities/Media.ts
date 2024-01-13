import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Comment } from './Comment';
import { Rating } from './Rating';
import { Season } from './Season';
import { Media_Contributor } from './Media_Contributor';
import { Media_Genre } from './Media_Genre';
import { Watchlist } from './Watchlist';

@Entity()
@Index(["name", "description"], { fulltext: true })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column({ type: 'text' })
  video: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  release_date: Date;

  @Column({ type: 'enum', enum: ['0', '6', '12', '16', '18'] })
  fsk: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Comment, (comment) => comment.media)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.media)
  ratings: Rating[];

  @OneToMany(() => Season, (season) => season.media)
  seasons: Season[];

  @OneToMany(() => Media_Contributor, (media_contributor) => media_contributor.media)
  media_contributors: Media_Contributor[];

  @OneToMany(() => Media_Genre, (media_genre) => media_genre.media)
  media_genres: Media_Genre[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.media)
  watchlists: Watchlist[];

}