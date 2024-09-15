import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'src/roles/entities/user-role.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, UserRole]), RolesModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
