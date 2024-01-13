import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Media } from './Media';
import { Contributor } from './Contributor';

@Entity()
export class Media_Contributor {
  @PrimaryColumn()
  mediaId: number;

  @PrimaryColumn()
  contributorId: number;

  @ManyToOne(() => Media, (media) => media.media_contributors)
  media: Media[];

  @ManyToOne(() => Contributor, (contributor) => contributor.media_contributors)
  contributor: Contributor[];
}