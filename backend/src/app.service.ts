import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greeting(): string {
    return 'Willkommen zum Backend der Website Serio!';
  }
}
