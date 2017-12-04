import { TestBed, inject } from '@angular/core/testing';

import { ArticletGuardService } from './article-guard.service';

describe('ArticleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleGuardService]
    });
  });

  it('should be created', inject([ArticleGuardService], (service: ArticleGuardService) => {
    expect(service).toBeTruthy();
  }));
});
