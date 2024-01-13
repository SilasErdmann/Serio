import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from '../typeorm/entities/Watchlist';
import { WatchlistsController } from './controller/watchlists/watchlists.controller';
import { WatchlistsService } from './service/watchlists/watchlists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist])],
  controllers: [WatchlistsController],
  providers: [WatchlistsService]
})
export class WatchlistsModule {}