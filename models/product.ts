class Product {
  id: string
  ownerId: string
  imageUrl: string
  title: string
  description: string
  price: number
  constructor(id: string, ownerId: string, title: string, imageUrl: string, description: string, price: number) {
    this.id = id
    this.ownerId = ownerId
    this.imageUrl = imageUrl
    this.title = title
    this.description = description
    this.price = price
  }
}

export default Product
