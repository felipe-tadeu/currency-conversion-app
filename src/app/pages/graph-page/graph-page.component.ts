import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SameCurrencyErrorStateMatcher } from 'src/app/matchers/SameCurrencyErrorStateMatcher.class';
import { ExchangeRatePair } from 'src/app/models/ExchangeRatePair.class';
import { GraphPageService } from './graph-page.service';
import { AmountErrorStateMatcher } from 'src/app/matchers/AmountErrorStateMatcher.class';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConversionData } from 'src/app/models/ConversionData.class';
import { ConversionResult } from 'src/app/models/ConversionResult.class';

const VALID_NUMBER_PATTERN = /(?<=^| )\d+(\.\d+)?(?=$| )/;

export function createSameCurrencyValidator(): ValidatorFn {
  return (form): ValidationErrors | null => {
    let input = form.get('input');
    let output = form.get('output');

    if (
      input &&
      output &&
      !input.hasError('required') &&
      !output.hasError('required') &&
      input.value === output.value
    )
      return { sameCurrency: true };
    return null;
  };
}

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
  private _form: FormGroup = new FormGroup({});
  private _sameCurrencyMatcher = new SameCurrencyErrorStateMatcher();
  private _amountMatcher = new AmountErrorStateMatcher();
  private _conversionResult: ConversionData | null = null;

  constructor(
    private _service: GraphPageService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCurrencies();
    this.getAllExchangeRatePairs();
    this.buildForm();
  }

  private buildForm() {
    this._form = this._formBuilder.group(
      {
        input: ['', Validators.required],
        output: ['', Validators.required],
        amount: [
          '',
          [Validators.required, Validators.pattern(VALID_NUMBER_PATTERN)],
        ],
      },
      {
        validators: [createSameCurrencyValidator()],
      }
    );
  }

  private getAllCurrencies() {
    this._loadingCurrencies = true;
    this._service.getAllCurrencies().subscribe({
      next: (currencies: string[]) => (this._currencies = currencies),
      error: () => (this._loadingCurrencies = false),
      complete: () => (this._loadingCurrencies = false),
    });
  }

  public submitForm() {
    if (this._form.invalid) this._form.markAllAsTouched();
    else this.getConversion();
  }

  private getConversion() {
    this._loadingConversion = true;
    this._conversionResult = null;
    this._service
      .getConversion(
        this.form.get('input')?.value,
        this.form.get('output')?.value,
        this.form.get('amount')?.value
      )
      .subscribe({
        next: (convertedValue: ConversionResult) => {
          this._conversionResult = new ConversionData(
            this.form.get('input')?.value,
            this.form.get('amount')?.value,
            this.form.get('output')?.value,
            convertedValue.convertedValue
          );
        },
        error: () => (this._loadingConversion = false),
        complete: () => (this._loadingConversion = false),
      });
  }

  public numbersOnly(event: KeyboardEvent) {
    var input =
      this._form.get('amount')?.value +
      (event.key === '.' ? event.key + '0' : event.key);
    if (!VALID_NUMBER_PATTERN.test(input)) {
      event.preventDefault();
    }
  }

  private getAllExchangeRatePairs() {
    this._loadingExchangeRatePairs = true;
    this._service.getAllExchangeRatePairs().subscribe({
      next: (currencies: ExchangeRatePair[]) =>
        (this._exchangeRatePairs = currencies),
      error: () => (this._loadingExchangeRatePairs = false),
      complete: () => (this._loadingExchangeRatePairs = false),
    });
  }

  public controlErrorRequired(control: string): boolean | undefined {
    return this.form.get(control)?.hasError('required');
  }

  public formErrorSameCurrenty(): boolean {
    return this._form.hasError('sameCurrency');
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

  public get form(): FormGroup {
    return this._form;
  }

  public get sameCurrencyMatcher(): ErrorStateMatcher {
    return this._sameCurrencyMatcher;
  }

  public get amountMatcher(): ErrorStateMatcher {
    return this._amountMatcher;
  }

  public get conversionResult(): ConversionData | null {
    return this._conversionResult;
  }
}
