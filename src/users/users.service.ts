import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
    private users: any = [{
        id: 1,
        name: 'Talles',
        email: 'test@mail.com',
        role: 'ADMIN'
    },{
        id: 2,
        name: 'Test 2',
        email: 'test2@mail.com',
        role: 'ENGINEER'
    }];

    findAll(role?: 'ADMIN' | 'ENGINEER'): any {
        if (role) {
            const usersInRole = this.users.filter(user => user.role === role);
            if(usersInRole.length === 0) { throw new NotFoundException('User not found'); }
            return usersInRole;
        } 
        return this.users;
    }

    findOne(id: number): any {
        const user = this.users.find(u => u.id == id);
        if(!user) { throw new NotFoundException('User not found'); }

        return user;
    }

    create(user: CreateUserDto): any {
        this.users.push(user);
        return user;
    }

    update(id: number, user: UpdateUserDto): any {
        const indexToDelete = this.users.findIndex(u => u.id == id);
        this.users.splice(indexToDelete, 1);
        this.users.push(user);
        return user;
    }

    delete(id: number): any {
        const indexToDelete = this.users.findIndex(u => u.id == id);
        this.users.splice(indexToDelete, 1);
        return this.users;
    }
}
