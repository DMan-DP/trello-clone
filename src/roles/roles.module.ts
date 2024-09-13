import { Module } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [TypeOrmModule.forFeature([Role, User, UserRole])],
    exports: [RolesService],
})
export class RolesModule {}
