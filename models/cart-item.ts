class CartItem {
  quantity: number
  productPrice: number
  productTitle: string
  sum: number
  // productId: string
  constructor(
    quantity: number,
    productPrice: number,
    productTitle: string,
    sum: number,
    // productId: string
  ) {
    this.quantity = quantity
    this.productPrice = productPrice
    this.productTitle = productTitle
    this.sum = sum
    // this.productId = productId
  }
}

export default CartItem
