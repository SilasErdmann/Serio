import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '../../../typeorm/entities/Episode';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode) private episodeRepository: Repository<Episode>,
  ) {}

  // Diese Funktion sucht und gibt Episoden anhand der Staffel-ID zurück.
  async findEpisodesBySeasonId(seasonId: number) {
    return await this.episodeRepository.find({
      relations: {
        season: true,
      },
      where: {
        season: {
          id: seasonId,
        },
      },
    });
  }
}