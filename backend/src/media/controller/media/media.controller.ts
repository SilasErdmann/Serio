import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MediaService } from '../../services/media/media.service';
import { Public } from 'src/public.decorator';

@Controller('media')
export class MediaController {
    constructor(private mediaService: MediaService) {}

    @Public()
    @Get(':id')
    getMediaById(@Param('id', ParseIntPipe) id: number) {
        return this.mediaService.findMediaById(id);
    }

    @Public()
    @Get('movies/:GenreId/:page')
    getMovieByGenreId(
        @Param('GenreId', ParseIntPipe) GenreId: number,
        @Param('page', ParseIntPipe) page: number,
        ) {
        return this.mediaService.findMovieByGenreId(GenreId, page);
    }

    @Public()
    @Get('series/:GenreId/:page')
    getSeriesByGenreId(@Param('GenreId', ParseIntPipe) GenreId: number,
    @Param('page', ParseIntPipe) page: number,) {
        return this.mediaService.findSeriesByGenreId(GenreId, page);
    }

    @Public()
    @Get('genre/:GenreId/:page')
    getMediaByGenreId(
      @Param('GenreId', ParseIntPipe) GenreId: number,
      @Param('page', ParseIntPipe) page: number,
    ) {
      return this.mediaService.findMediaByGenreId(GenreId, page);
    }

    @Public()
    @Get('pages/:GenreId')
    getPagesByGenreId(
      @Param('GenreId', ParseIntPipe) GenreId: number,
    ) {
      return this.mediaService.findPagesGenreId(GenreId);
    }

    @Public()
    @Get('search/:term/:page')
    getMediaByTerm(@Param('term') term: string,
    @Param('page', ParseIntPipe) page: number,
    ) {
        return this.mediaService.findMediaByTerm(term, page);
    }

    @Public()
    @Get(':mediaId/:page')
    getSimilarMedia(
      @Param('mediaId', ParseIntPipe) mediaId: number,
      @Param('page', ParseIntPipe) page: number,
    ) {
      return this.mediaService.findSimilarMedia(mediaId, page);
    }

    @Public()
    @Get('latest/media/:page')
    getLatestMedia(@Param('page', ParseIntPipe) page: number) {
      return this.mediaService.findLatestMedia(page);
    }

    @Public()
    @Get('bestRated/media/:page')
    getBestRatedMedia(@Param('page', ParseIntPipe) page: number) {
      return this.mediaService.findBestRatedMedia(page);
    }

    @Public()
    @Get('upcoming/media/:page')
    getUpcomingMedia(@Param('page', ParseIntPipe) page: number) {
      return this.mediaService.findUpcomingMedia(page);
    }

}