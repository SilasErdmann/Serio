import { Body, Controller, Request, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { CreateRatingDto } from '../../dtos/CreateRating.dto';
import { RatingsService } from '../../services/ratings/ratings.service';
import { Public } from 'src/public.decorator';

@Controller('ratings')
export class RatingsController {
    constructor(private ratingService: RatingsService) {}
    @Public()
    @Get('media/:MediaId')
    getRatingByMediaId(@Param('MediaId', ParseIntPipe) MediaId: number) {
        return this.ratingService.findRatingsByMediaId(MediaId);
    }

    @Post()
    CUDRating(
        @Request() request: any,
        @Body() CreateRatingDto: CreateRatingDto) {
        const userId = request.userId;
        return this.ratingService.CUDRating(CreateRatingDto, userId);
    }

    @Get(':mediaId')
    getAlreadyRated(
        @Request() request: any,
        @Param('mediaId', ParseIntPipe) mediaId: number) {
        const userId = request.userId;
        return this.ratingService.findAlreadyRated(mediaId, userId);
    }

}