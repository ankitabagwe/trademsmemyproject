import { TestBed } from '@angular/core/testing';

import { IndiancitiesService } from './indiancities.service';

describe('IndiancitiesService', () => {
  let service: IndiancitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndiancitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
