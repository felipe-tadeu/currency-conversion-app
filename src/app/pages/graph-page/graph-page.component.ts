import { Component, OnInit } from '@angular/core';
import { GraphPageService } from './graph-page.service';
import { ExchangeRatePair } from 'src/app/models/ExchangeRatePair.class';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent implements OnInit {
  private _loadingCurrencies = false;
  private _loadingExchangeRatePairs = false;
  private _loadingConversion = false;
  private _currencies: string[] = [];
  private _exchangeRatePairs: ExchangeRatePair[] = [];
  private _form: FormGroup | undefined;

  constructor(private _service: GraphPageService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAllCurrencies();
    this.getAllExchangeRatePairs();
    this._form = this._formBuilder.group({
      input: '',
      output: '',
      amount: ''
    })
  }

  private getAllCurrencies() {
    this._loadingCurrencies = true;
    this._service.getAllCurrencies().subscribe({
      next: (currencies: string[]) => this._currencies = currencies,
      complete: () => this._loadingCurrencies = false
    });
  }

  public submitForm() {
    console.log('aaa');
    
  }

  private getAllExchangeRatePairs() {
    this._loadingExchangeRatePairs = true;
    this._service.getAllExchangeRatePairs().subscribe({
      next: (currencies: ExchangeRatePair[]) => this._exchangeRatePairs = currencies,
      complete: () => this._loadingExchangeRatePairs = false
    });
  }

  public get loadingCurrencies(): boolean {
    return this._loadingCurrencies;
  }

  public get loadingExchangeRatePairs(): boolean {
    return this._loadingExchangeRatePairs;
  }

  public get loadingConversion(): boolean {
    return this._loadingConversion;
  }

  public get currencies(): string[] {
    return this._currencies;
  }

  public get exchangeRatePairs(): ExchangeRatePair[] {
    return this._exchangeRatePairs;
  }

  public get form(): FormControl {
    return this.form;
  }
}
