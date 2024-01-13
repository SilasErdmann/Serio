import { IsString, Length, IsInt } from 'class-validator';

export class CreateCommentDto {

    @IsString({ message: 'Der Kommentar muss aus Buchstaben und Zeichen bestehen.'})
    @Length(1, 1000, { message: 'Der Kommentar darf nur zwischen 1 und 1000 Zeichen haben.'})
    text: string;

    @IsInt({ message: 'Die Medien-ID muss eine ganze Zahl sein.'})
    mediaId: number;
}