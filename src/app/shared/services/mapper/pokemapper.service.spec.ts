import { TestBed } from '@angular/core/testing';

import { PokemapperService } from './pokemapper.service';

describe('PokemapperService', () => {
  let service: PokemapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
