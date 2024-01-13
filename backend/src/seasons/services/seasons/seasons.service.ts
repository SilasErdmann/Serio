import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../../../typeorm/entities/Season';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season) private seasonRepository: Repository<Season>,
  ) {}

  // Sucht nach Staffeln anhand einer Medien-ID.
  async findSeasonsByMediaId(mediaId: number) {
    return await this.seasonRepository.find({
      relations: {
        media: true,
      },
      where: {
        media: {
          id: mediaId,
        },
      },
    });
  }
}
