export class ExchangeRatePair {
    constructor(
        public inputCurrency: string,
        public outputCurrency: string,
        public exchangeRate: string
    ) {}
}