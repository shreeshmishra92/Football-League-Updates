import { TestBed } from '@angular/core/testing';

import { AddleagueInterceptor } from './add-header-interceptor.interceptor';

describe('AddHeaderInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AddleagueInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AddleagueInterceptor =
      TestBed.inject(AddleagueInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
