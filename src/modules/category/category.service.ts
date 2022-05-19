import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from "mongoose";
import { IUser } from 'src/config/interface';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository:Repository<Category>
  ) { }


  async createCategory(data) {

    const {title} = data; 

    const check = await this.categoryRepository.findOne( {title} ).catch((error)=>{
      throw new InternalServerErrorException(error.message);
    });
    
    if (check) {
      throw new BadRequestException({ msg: 'This category is already exists' });
    }

    try {
      await this.categoryRepository.save({title});
      return { msg:'done' };

    } catch (error) {
      throw new InternalServerErrorException({ msg: error.message });
    }
  }

  async getCategories() {
    try {
      const categories = await this.categoryRepository.find()
      return { categories };
    } catch (error) {
      throw new InternalServerErrorException({ msg: error.message });
    }
  }

  async updateCategory(id: string, title: string) {
    
    const check = await this.categoryRepository.findOne(id);
    if(!check){
      throw new BadRequestException('Category does not exist.');
    }

    try {
      await this.categoryRepository.update({
        id: id
      }, {
        title: title.toLowerCase()
      });

      return { msg: 'Update Success!' };
    } catch (error) {
      throw new InternalServerErrorException({ msg: error.message });
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryRepository.delete(id);
      return {msg:'success'};
    } catch (error) {
      throw new InternalServerErrorException({ msg: error.message });
    }
  }
}
