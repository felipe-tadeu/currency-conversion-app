import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRatePair } from 'src/app/models/ExchangeRatePair.class';

@Injectable({
  providedIn: 'root'
})
export class GraphPageService {

  private url = "http://localhost:8080/currency-conversion/jgrapht"

  constructor(private http: HttpClient) { }

  public getAllCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(this.url + "/currencies");
  }

  getAllExchangeRatePairs(): Observable<ExchangeRatePair[]> {
    return this.http.get<ExchangeRatePair[]>(this.url + "/exchange-rate-pairs");
  }
}
