import { Test, TestingModule } from '@nestjs/testing';
import { UserGResolver } from './user-g.resolver';
import { UserGService } from './user-g.service';

describe('UserGResolver', () => {
  let resolver: UserGResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGResolver, UserGService],
    }).compile();

    resolver = module.get<UserGResolver>(UserGResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
