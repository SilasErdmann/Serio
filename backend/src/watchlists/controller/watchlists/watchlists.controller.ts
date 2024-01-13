import { Controller, Request, Get, Param, Post, ParseIntPipe, Delete } from '@nestjs/common';
import { WatchlistsService } from '../../service/watchlists/watchlists.service';

@Controller('watchlists')
export class WatchlistsController {
    constructor(private watchlistService: WatchlistsService) {}
    
    @Get(':page')
    getWatchlist(@Param('page', ParseIntPipe) page: number, @Request() request: any) {
        const userId = request.userId;
        return this.watchlistService.findWatchlist(userId, page);
    }

    @Post(':mediaId')
    createWatchlist(@Param('mediaId', ParseIntPipe) mediaId: number, @Request() request: any) {
        const userId = request.userId;
        return this.watchlistService.createWatchlist(mediaId, userId);
    }

    @Delete(':mediaId')
    deleteComment(@Param('mediaId', ParseIntPipe) mediaId: number, @Request() request: any) {
        const userId = request.userId;
        this.watchlistService.deleteWatchlist(mediaId, userId)
    }

}