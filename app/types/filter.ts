export interface Filter {
  brands: string[];
  price: Price;
}
export interface Price {
  min: number;
  max: number;
}