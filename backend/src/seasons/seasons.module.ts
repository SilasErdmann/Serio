import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from '../typeorm/entities/Season';
import { SeasonsService } from './services/seasons/seasons.service';
import { SeasonsController } from './controller/seasons/seasons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  controllers: [SeasonsController],
  providers: [SeasonsService]
})
export class SeasonsModule {}
