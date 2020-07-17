import Product from '../../models/product'

interface AvailableProducts {
  availableProducts: Array<Product>;
}

interface RootState {
  products: AvailableProducts;
}

export { RootState }
