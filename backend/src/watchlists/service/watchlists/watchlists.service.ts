import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from '../../../typeorm/entities/Watchlist';

@Injectable()
export class WatchlistsService {
    constructor(
        @InjectRepository(Watchlist) private watchlistRepository: Repository<Watchlist>,
      ) {}

      async findWatchlist(userId: number, page: number) {
        const limit = 18;
      
        return await this.watchlistRepository.find({
          relations: {
            media: true,
          },
          where: {
            userId: userId,
          },
          order: {
            addedDate: 'DESC', // Sort by addedDate in descending order (newest first)
          },
          skip: (page - 1) * limit,
          take: limit,
        });
      }      

      createWatchlist(mediaId: number, userId: number) {
        const newComment = this.watchlistRepository.create({
          addedDate: new Date(),
          mediaId,
          userId,
        });
        return this.watchlistRepository.save(newComment);
      }

      deleteWatchlist(mediaId: number, userId: number) {
        return this.watchlistRepository.delete({ mediaId, userId});
      }

}