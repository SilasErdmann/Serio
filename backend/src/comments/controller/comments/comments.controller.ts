import { Body, Controller, Delete, Request, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { CreateCommentDto } from '../../dtos/CreateComment.dto';
import { CommentsService } from '../../services/comments/comments.service';
import { UpdateCommentDto } from 'src/comments/dtos/UpdateComment.dto';
import { Public } from 'src/public.decorator';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}
    
    @Public()
    @Get(':MediaId/:page')
    getCommentsByMediaId(@Param('MediaId', ParseIntPipe) MediaId: number,
    @Param('page', ParseIntPipe) page: number,
    ) {
        return this.commentService.findCommentsByMediaId(MediaId, page);
    }

    @Post()
    createComment(
        @Request() request: any,
        @Body() CreateCommentDto: CreateCommentDto) {
        const userId = request.userId;
        return this.commentService.createComment(CreateCommentDto, userId);
    }

    @Put(':id')
    async updateCommentByMediaId(
        @Param('id', ParseIntPipe) id: number, 
        @Request() request: any,
        @Body() updateCommentDto: UpdateCommentDto
    ) {
        const userId = request.userId;
        await this.commentService.updateComment(userId, id, updateCommentDto)
    }

    @Delete(':id')
    async deleteCommentByMediaId(
        @Param('id', ParseIntPipe) id: number,
        @Request() request: any) {
        const userId = request.userId;
        await this.commentService.deleteComment(userId, id)
    }

}