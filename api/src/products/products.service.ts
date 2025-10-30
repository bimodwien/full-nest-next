import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
// const data = require('../../../mock.json'); // Alternative way to import JSON
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class ProductsService {
  /*
  ini kalo pake require, tapi kadang ada masalah tsconfig.json..
  jadi datanya itu pake data.products karena di mock.json ada di dalam object :
    private products: Product[] = (data.products ?? []) as Product[];
*/

  private products: Product[] = (
    JSON.parse(
      readFileSync(join(process.cwd(), '..', 'mock.json'), 'utf-8'),
    ) as {
      products: Product[];
    }
  ).products;

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
