import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products'
import Product from '../../models/product'


// state
interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

// payloads
interface UserProducts {
  userProducts: Product[];
}

interface Products {
  products: Product[]
}

interface ProductData {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

// actions
interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  pid: string;
}

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: ProductData;
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  pid: string;
  productData: ProductData;
}

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: Products;
  userProducts: UserProducts;
}

export type ProductActionTypes = DeleteProductAction | CreateProductAction | UpdateProductAction | SetProductsAction
export { ProductsState }