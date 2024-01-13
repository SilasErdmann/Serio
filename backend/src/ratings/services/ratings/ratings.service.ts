import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../../../typeorm/entities/Rating';
import { CreateRatingParams } from '../../types';

@Injectable()
export class RatingsService {

    constructor(
        @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    ) {}

    // Diese Funktion sucht und gibt die Bewertungen anhand einer Medien-ID zurück.
    findRatingsByMediaId(mediaId: number) {
        return this.ratingRepository.find({ where: { mediaId } });
    }

    // Diese Funktion erstellt eine neue Bewertung, falls diese bereits und die bewertung die gleiche ist wird diese gelöscht falls der werd anders ist wird diese geupdated.
    async CUDRating(ratingDetails: CreateRatingParams, userId: number) {
    const { mediaId, rating } = ratingDetails;
  
      // Überprüfe, ob ein Rating bereits existiert
      const existingRating = await this.ratingRepository.findOne({ where: { mediaId, userId } });
      if (existingRating) {

        if(existingRating.rating == rating) {

            return this.ratingRepository.delete({ userId, mediaId });

        }

        return this.ratingRepository.update({ userId, mediaId }, { ...ratingDetails })
      }

        // Erstelle ein neues Rating Objekt
      const newRating = this.ratingRepository.create({ 
        ...ratingDetails,
        userId,
      });
  
      // Speichere die neue Bewertung in der Datenbank
      return this.ratingRepository.save(newRating);

    }

    findAlreadyRated(mediaId: number, userId: number) {
      return this.ratingRepository.find({ where: { mediaId, userId } });
    }
  
}