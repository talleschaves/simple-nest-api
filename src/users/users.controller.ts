import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get() // /users
    findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER'): any {
        return this.service.findAll(role);
    }

    @Get(':id') // /users/:id
    findOne(@Param('id', ParseIntPipe) id: number): any {
        return this.service.findOne(id);
    }

    @Post() // /users
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.service.create(user);
    }

    @Patch(':id') // /users
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) user: UpdateUserDto) {
        return this.service.update(id, user);
    }

    @Delete(':id') // /users
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
