import { TestBed } from '@angular/core/testing';

import { TestimonialServiceService } from './testimonial-service.service';

describe('TestimonialServiceService', () => {
  let service: TestimonialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
