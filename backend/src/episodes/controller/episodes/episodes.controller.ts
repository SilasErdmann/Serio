import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { Public } from 'src/public.decorator';

@Controller('episodes')
export class EpisodesController {
    constructor(private episodeService: EpisodesService) {}
    
    @Public()
    @Get(':SeasonId')
    getEpisodesBySeasonId(@Param('SeasonId', ParseIntPipe) SeasonId: number) {
        return this.episodeService.findEpisodesBySeasonId(SeasonId);
    }

}

