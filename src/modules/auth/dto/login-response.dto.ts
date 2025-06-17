import { UserDto } from '@/common/dto/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ type: () => UserDto, description: 'User details' })
  @IsOptional()
  user?: UserDto;

  @ApiProperty({
    example: 'jwt_token_12345',
    description: 'JWT token for authentication',
  })
  @IsNotEmpty()
  token: string;

  @IsOptional()
  message?: string;
}
