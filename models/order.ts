import Cartitem from './cart-item'

interface iProps {
  id: string;
  items: Cartitem[];
  totalAmount: number;
  date: Date;
}

class Order {
  id: string
  items: Cartitem[]
  totalAmount: number
  date: Date
  constructor({ id, items, totalAmount, date }: iProps) {
    this.id = id
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
  }
  get readableDate() {
    return this.date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

export default Order
