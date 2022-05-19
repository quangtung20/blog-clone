import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from 'src/database/entities/sub-category.entity';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([SubCategory])
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService]
})
export class SubCategoryModule {}
