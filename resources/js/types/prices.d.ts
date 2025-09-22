export const PRICE_CURRENCIES = ["GBP", "USD", "EUR"];
export enum PriceCurrencyEnum {
	GBP = "GBP",
	USD = "USD",
	EUR = "EUR",
}
export type PriceCurrency = (typeof PRICE_CURRENCIES)[number];
