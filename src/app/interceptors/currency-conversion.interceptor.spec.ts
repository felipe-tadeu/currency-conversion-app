import { TestBed } from '@angular/core/testing';

import { CurrencyConversionInterceptor } from './currency-conversion.interceptor';

describe('CurrencyConversionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CurrencyConversionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CurrencyConversionInterceptor = TestBed.inject(CurrencyConversionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
