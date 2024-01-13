import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ContributorsService } from '../../services/contributors/contributors.service';
import { Public } from 'src/public.decorator';

@Controller('contributors')
export class ContributorsController {
  constructor(private contributorService: ContributorsService) {}

  @Public()
  @Get(':MediaId/:page')
  getContributorsByMediaId(
    @Param('MediaId', ParseIntPipe) MediaId: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.contributorService.findContributorsByMediaId(MediaId, page);
  }
}
