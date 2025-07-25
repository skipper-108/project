export class Product {
  constructor(id, name, type, sku, imageUrl, description, quantity, price, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.sku = sku;
    this.imageUrl = imageUrl;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(name, type, sku, imageUrl, description, quantity, price) {
    return new Product(
      null,
      name,
      type,
      sku,
      imageUrl,
      description,
      quantity,
      price,
      new Date(),
      new Date()
    );
  }

  updateQuantity(newQuantity) {
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this.quantity = newQuantity;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      sku: this.sku,
      imageUrl: this.imageUrl,
      description: this.description,
      quantity: this.quantity,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 