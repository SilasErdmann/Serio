import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, Not, In, MoreThan, LessThanOrEqual, LessThan } from "typeorm";
import { Media } from "../../../typeorm/entities/Media";
//import { Rating } from "../../../typeorm/entities/Rating";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>
    //@InjectRepository(Rating) private ratingRepository: Repository<Rating>,
  ) {}

  private limit = 18;

  // Diese Funktion sucht und gibt alle Filme eines bestimmten Genres zurück.
  async findMovieByGenreId(GenreId: number, page: number) { 

    return await this.mediaRepository.find({
      relations: {
        media_genres: true,
        seasons: true,
      },
      where: {
        media_genres: {
          genreId: GenreId,
        },
        seasons: {
          id: IsNull(),
        },
      },
      skip: (page - 1) * this.limit,
      take: this.limit,
    });
  }

  // Diese Funktion sucht und gibt Serien eines bestimmten Genres zurück.
  async findSeriesByGenreId(GenreId: number, page: number) {

    return await this.mediaRepository.find({
      relations: {
        media_genres: true,
        seasons: true,
      },
      where: {
        media_genres: {
          genreId: GenreId,
        },
        seasons: {
          id: Not(IsNull()),
        },
      },
      skip: (page - 1) * this.limit,
      take: this.limit,
    });
  }

  // Diese Funktion sucht und gibt Filme und Serien eines bestimmten Genres zurück.
  async findMediaByGenreId(GenreId: number, page: number) {

    const limit = 6;

    return await this.mediaRepository.find({
      relations: {
        media_genres: true,
      },
      where: {
        media_genres: {
          genreId: GenreId,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // Diese Funktion sucht und gibt ein Medium anhand der ID zurück.
findMediaById(id) {
    
  return this.mediaRepository.findOne({
    relations: ['media_genres'],
    where: { id: id },
  });

}

  // Diese Funktion sucht und gibt Medien anhand eines Suchbegriffs zurück.
  findMediaByTerm(term: string, page: number) {
    const threshold = 1.3;
    const query = this.mediaRepository.createQueryBuilder("media")
    
      .leftJoin("media.media_contributors", "media_contributors")
      .leftJoin("media.seasons", "seasons")
      .leftJoin("seasons.episodes", "episodes")
  
      .where('media.name like :term', { term: `%${term}%` })
      .orWhere('media.description like :term', { term: `%${term}%` })
      .orWhere('seasons.description like :term', { term: `%${term}%` })
      .orWhere('episodes.name like :term', { term: `%${term}%` })
      .orWhere('episodes.description like :term', { term: `%${term}%` })

      .skip((page - 1) * this.limit)
      .take(this.limit);

    return query.getMany();
  }

  async findSimilarMedia(mediaId: number, page: number) {
    const limit = 7; // Maximale Anzahl der ähnlichen Medien, die in einem Durchlauf abgerufen werden sollen
  
    // Zuerst Genre-IDs des gegebenen Films abrufen
    const media: Media = await this.mediaRepository.findOne({
      relations: ["media_genres"],
      where: {
        id: mediaId,
      },
    });
  
    // Array mit allen Genre-IDs des gegebenen Films erstellen
    const genreIds: number[] = media.media_genres.map((genre) => genre.genreId);
  
    // Ähnliche Medien abrufen und Query-Optionen direkt in der "find"-Methode definieren
    const similarMedia: Media[] = await this.mediaRepository.find({
      relations: {
        media_genres: true,
      },
      where: {
        id: Not(mediaId),
        media_genres: {
          genreId: In(genreIds),
        },
      },
    });
  
    // Nach der Anzahl der übereinstimmenden Genre-IDs absteigend sortieren
    similarMedia.sort((a, b) => {
      const aCommonGenres = a.media_genres.filter((genre) =>
        genreIds.includes(genre.genreId)
      ).length;
      const bCommonGenres = b.media_genres.filter((genre) =>
        genreIds.includes(genre.genreId)
      ).length;
      return bCommonGenres - aCommonGenres;
    });
  
    // Index des ersten Elements auf der angegebenen Seite berechnen
    const startIndex = (page - 1) * limit;
  
    // Paginierte ähnliche Medien zurückgeben
    return similarMedia.slice(startIndex, startIndex + limit);
  }

  async findPagesGenreId(GenreId: number) {

    const results = await this.mediaRepository.find({
      relations: {
        media_genres: true,
      },
      where: {
        media_genres: {
          genreId: GenreId,
        },
      },
    });

    const totalCount = results.length;
    const dividedValue = totalCount / 6;
    const maxPages = Math.ceil(dividedValue);

    return maxPages;
  }

  findLatestMedia(page: number) {
    const limit = 6;
    const currentDate = new Date();
  
    return this.mediaRepository.find({
      relations: {
        media_genres: true,
      },
      where: {
        release_date: LessThanOrEqual(currentDate), // Filtern nach Medien mit release_date kleiner oder gleich dem heutigen Datum
      },
      order: {
        release_date: "DESC",
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findBestRatedMedia(page: number) {
    const limit = 6;
    // Heutiges Datum
    const today = new Date();

    const mediaWithRatings = await this.mediaRepository.find({
      relations: ['ratings'],
      where: {
        release_date: LessThan(today), // Hier wird "MoreThan" verwendet, um Medien mit einem Datum nach dem heutigen Datum zu finden
      },
    });

    // Calculate the percentage of likes for each media
    const mediaWithLikesPercentage = mediaWithRatings.map((media) => {
      const totalRatings = media.ratings.length;
      const totalLikes = media.ratings.filter((rating) => rating.rating === 1).length;
      const likesPercentage = totalLikes / totalRatings;
      return {
        ...media,
        totalRatings,
        totalLikes,
        likesPercentage,
      };
    });

    // Sort media based on likes percentage in descending order
    const sortedMedia = mediaWithLikesPercentage.sort((a, b) => b.likesPercentage - a.likesPercentage);

    // Berechne die Startposition des aktuellen Seitenbereichs basierend auf der gewünschten Seite und der Seitenbegrenzung (limit)
    const startIndex = (page - 1) * limit;

    // Verwende Array.slice() um die Daten für die aktuelle Seite zu extrahieren
    const paginatedData = sortedMedia.slice(startIndex, startIndex + limit);

    return paginatedData;
  }

  async findUpcomingMedia(page: number) {
    const limit = 6;

    const upcomingMedia = await this.mediaRepository.find({
        where: {
            release_date: MoreThan(new Date()), // Filtern nach Veröffentlichungsdatum, das in der Zukunft liegt
        },
        relations: {
            media_genres: true,
        },
        order: {
            release_date: "ASC", // Aufsteigende Reihenfolge nach Veröffentlichungsdatum
        },
        skip: (page - 1) * limit,
        take: limit,
    });

    return upcomingMedia;
}


}