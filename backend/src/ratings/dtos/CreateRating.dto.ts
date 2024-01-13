import { IsBoolean, IsInt } from 'class-validator';

export class CreateRatingDto {

    @IsBoolean({ message: 'Eine Bewertung muss entweder wahr oder falsch sein.'})
    rating: number;

    @IsInt({ message: 'Die Medien-ID muss eine ganze Zahl sein.'})
    mediaId: number;
}