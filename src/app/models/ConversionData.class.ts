export class ConversionData {
  constructor(
    public inputCurrency: string,
    public amountToConvert: string,
    public outputCurrency: string,
    public amountConverted: string
  ) {}
}
