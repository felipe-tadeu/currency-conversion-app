import { TestBed } from '@angular/core/testing';

import { GraphPageService } from './graph-page.service';

describe('GraphPageService', () => {
  let service: GraphPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
