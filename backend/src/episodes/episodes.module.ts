import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from '../typeorm/entities/Episode';
import { EpisodesController } from './controller/episodes/episodes.controller';
import { EpisodesService } from './services/episodes/episodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
  controllers: [EpisodesController],
  providers: [EpisodesService]
})
export class EpisodesModule {}