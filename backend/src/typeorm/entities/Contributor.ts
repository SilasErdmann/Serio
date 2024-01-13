import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Media_Contributor } from './Media_Contributor';

@Entity()
export class Contributor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type:'enum', enum:['Autor', 'Schauspieler', 'Regisseur'] })
  role: string;

  @OneToMany(() => Media_Contributor, (media_contributor) => media_contributor.contributor)
  media_contributors: Media_Contributor[];
}