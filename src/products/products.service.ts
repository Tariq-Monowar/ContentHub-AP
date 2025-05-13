import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
    return this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.databaseService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { Id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.databaseService.product.update({
        where: { Id: id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.product.delete({
        where: { Id: id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
