import { TestBed } from '@angular/core/testing';

import { SharedComponentLibraryService } from './shared-component-library.service';

describe('SharedComponentLibraryService', () => {
  let service: SharedComponentLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedComponentLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
