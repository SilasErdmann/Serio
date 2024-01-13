import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { Public } from 'src/public.decorator';

@Controller('seasons')
export class SeasonsController {
    constructor(private seasonService: SeasonsService) { }

    @Public()
    @Get(':MediaId')
    getSeasonsByMediaId(@Param('MediaId', ParseIntPipe) MediaId: number) {
        return this.seasonService.findSeasonsByMediaId(MediaId);
    }
}
