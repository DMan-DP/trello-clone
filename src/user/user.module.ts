import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'src/roles/entities/user-role.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User, Role, UserRole]), RolesModule, forwardRef(() => AuthModule)],
    exports: [UserService],
})
export class UserModule {}
