import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contributor } from '../typeorm/entities/Contributor';
import { ContributorsController } from './controller/contributors/contributors.controller';
import { ContributorsService } from './services/contributors/contributors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contributor])],
  controllers: [ContributorsController],
  providers: [ContributorsService]
})
export class ContributorsModule {}