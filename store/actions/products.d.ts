interface iCreateProduct {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface iUpdateProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export { iCreateProduct, iUpdateProduct }
