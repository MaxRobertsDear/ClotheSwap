import Product from '../models/product'

interface Products {
  availableProducts: Array<Product>;
  userProducts: Array<Product>;
}

interface RootState {
  products: Products;
}

export { RootState }
