import { Test, TestingModule } from '@nestjs/testing';
import { UserGService } from './user-g.service';

describe('UserGService', () => {
  let service: UserGService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGService],
    }).compile();

    service = module.get<UserGService>(UserGService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
