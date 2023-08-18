import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversionResult } from 'src/app/models/ConversionResult.class';
import { ExchangeRatePair } from 'src/app/models/ExchangeRatePair.class';

@Injectable({
  providedIn: 'root',
})
export class GraphPageService {
  private url = 'http://localhost:8080/currency-conversion/jgrapht';

  constructor(private http: HttpClient) {}

  public getAllCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/currencies');
  }

  getAllExchangeRatePairs(): Observable<ExchangeRatePair[]> {
    return this.http.get<ExchangeRatePair[]>(this.url + '/exchange-rate-pairs');
  }

  getConversion(
    inputCurrency: string,
    outputCurrency: string,
    amountToConvert: string
  ): Observable<ConversionResult> {
    let params = new HttpParams()
      .append('inputCurrency', inputCurrency)
      .append('outputCurrency', outputCurrency)
      .append('amountToConvert', amountToConvert);
    return this.http.get<ConversionResult>(this.url, {
      params: params,
    });
  }
}
