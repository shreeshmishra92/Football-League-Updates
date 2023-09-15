import { TestBed } from '@angular/core/testing';

import { FootballappService } from './footballapp.service';

describe('FootballappService', () => {
  let service: FootballappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
