interface iProps {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

class Product {
  id: string
  ownerId: string
  imageUrl: string
  title: string
  description: string
  price: number
  constructor({ id, ownerId, title, imageUrl, description, price }: iProps) {
    this.id = id
    this.ownerId = ownerId
    this.imageUrl = imageUrl
    this.title = title
    this.description = description
    this.price = price
  }
}

export default Product
