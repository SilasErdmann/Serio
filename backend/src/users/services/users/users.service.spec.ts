/*

Die users.service.specs.ts Datei enthält Unit-Tests für die users.service.ts Datei.
Unit-Tests sind Softwaretests, die einzelne, abgrenzbare Teile von Computerprogrammen überprüfen.
Ihr Ziel ist es, die technische Lauffähigkeit und Korrektheit der fachlichen (Teil-)Ergebnisse der getesteten Einheiten nachzuweisen.
Unit-Tests werden in der Regel von den Softwareentwicklern selbst geschrieben und automatisiert ausgeführt.
Sie tragen zur Verbesserung des Designs, der Qualität und der Dokumentation der Software bei.
In Angular-Anwendungen ist es eine Konvention, für jede .ts Datei eine entsprechende .spec.ts Datei zu haben.
Die Tests in dieser Datei werden mit dem Jasmine Javascript Test Framework durch den Karma Test Runner ausgeführt, wenn der ng test Befehl verwendet wird.

*/

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
