import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IUser } from 'src/config/interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import RoleGuard from 'src/guards/role.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post()
  @UseGuards(RoleGuard('admin'))
  createCategory(
    @GetUser() user: any,
    @Body() data: CreateCategoryDto
  ) {
    return this.categoryService.createCategory(data);
  }

  @Patch(':id')
  @UseGuards(RoleGuard('admin'))
  updateCategory(
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    return this.categoryService.updateCategory(id, title);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('admin'))
  deleteCategory(
    @Param('id') id: string,
  ) {
    return this.categoryService.deleteCategory(id);
  }

}
