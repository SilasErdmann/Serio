import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contributor } from '../../../typeorm/entities/Contributor';

@Injectable()
export class ContributorsService {
  constructor(
    @InjectRepository(Contributor) private contributorRepository: Repository<Contributor>,
  ) {}

  // Diese Funktion sucht und gibt Mitwirkende (Contributors) anhand der Medien-ID zurück.
  async findContributorsByMediaId(MediaId: number, page: number) {
    const limit = 18;

    return await this.contributorRepository.find({
      relations: {
        media_contributors: true,
      },
      where: {
        media_contributors: {
          mediaId: MediaId,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}