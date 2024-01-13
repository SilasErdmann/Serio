import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from '../typeorm/entities/Media';
import { MediaController } from './controller/media/media.controller';
import { MediaService } from './services/media/media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}