import { TestBed } from '@angular/core/testing';

import { ProgramService } from '../../shared/services/program.service';

describe('ProgramService', () => {
  let service: ProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
