import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
const data = require('../../../mock.json');

@Injectable()
export class ProductsService {
  private products: Product[] = (data.products ?? []) as Product[];

  create(createProductDto: CreateProductDto): Product {
    const nextId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
    const newProduct: Product = { id: nextId, ...createProductDto } as Product;
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((item) => item.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...updateProductDto };
    return this.products[index];
  }

  remove(id: number): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    const [removed] = this.products.splice(index, 1);
    return removed;
  }
}
