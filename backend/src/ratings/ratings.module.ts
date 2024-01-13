import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '../typeorm/entities/Rating';
import { RatingsController } from './controller/ratings/ratings.controller';
import { RatingsService } from './services/ratings/ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule {}
