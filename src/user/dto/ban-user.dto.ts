import { IsString, IsUUID } from 'class-validator';

export class BanUserDto {
    @IsUUID(undefined, { message: 'User id should be a uuid' })
    readonly userId: string;

    @IsString()
    readonly banReason: string;
}
