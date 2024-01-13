import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../typeorm/entities/Comment';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}