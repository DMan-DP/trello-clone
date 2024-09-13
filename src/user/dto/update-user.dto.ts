import { IsEmail, IsUUID } from 'class-validator';

export class UpdateUserDto {
    @IsUUID(undefined, { message: 'User id should be a uuid' })
    readonly userId: string;

    @IsEmail({}, { message: 'Invalid email format' })
    readonly email: string;
}
