import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Rating } from './Rating';
import { Watchlist } from './Watchlist';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
    watchlists: Watchlist[];
}