import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../typeorm/entities/Comment';
import { CreateCommentParams, UpdateCommentParams } from '../../types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // Diese Funktion sucht und gibt alle Kommentare zu einem bestimmten Medium zurück.
  async findCommentsByMediaId(mediaId: number, page: number) {
    const limit = 20;
  
    const comments = await this.commentRepository.find({
      relations: ['user'], // Assuming 'user' is the relation property name in the Comment entity
      where: {
        mediaId: mediaId,
      },
      order: {
        date: 'DESC', // Sort by date in descending order (newest first)
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  
    // Modify the comments to include only the required data
    const modifiedComments = comments.map((comment) => {
      return {
        id: comment.id,
        text: comment.text,
        date: comment.date,
        mediaId: comment.mediaId,
        userId: comment.user.id,
        username: comment.user.username,
      };
    });
  
    return modifiedComments;
  }
  
  

  // Diese Funktion erstellt einen neuen Kommentar.
  createComment(commentDetails: CreateCommentParams, userId: number) {
    const newComment = this.commentRepository.create({
      ...commentDetails,
      userId,
      date: new Date(),
    });
    return this.commentRepository.save(newComment);
  }

  // Diese Funktion aktualisiert einen bestehenden Kommentar.
  updateComment(userId: number, id: number, updateCommentDetails: UpdateCommentParams) {
    return this.commentRepository.update({ userId, id }, { ...updateCommentDetails });
  }

  // Diese Funktion löscht einen bestehenden Kommentar.
  deleteComment(userId: number, id: number) {
    return this.commentRepository.delete({ userId, id });
  }
}
