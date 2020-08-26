interface iProps {
  quantity: number;
  productPrice: number;
  productTitle: string;
  sum: number;
}

class CartItem {
  quantity: number
  productPrice: number
  productTitle: string
  sum: number
  productId: string
  constructor({ quantity, productPrice, productTitle, sum }: iProps) {
    this.quantity = quantity
    this.productPrice = productPrice
    this.productTitle = productTitle
    this.sum = sum
  }
}

export default CartItem
