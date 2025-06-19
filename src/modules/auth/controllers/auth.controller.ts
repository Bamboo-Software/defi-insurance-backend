/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse, AuthUser, UseGuardAuth } from '@/decorators';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginSocialRequestDto } from '../dto/login-request.dto';
import { UserDto } from '../../../common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuardAuth()
  @ApiOkResponse({
    type: UserDto,
    description: 'Get current user',
  })
  async me(@AuthUser('id') id: string) {
    return this.authService.me(id);
  }

  @Post('login-social')
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'Login with social',
  })
  loginSocial(@Body() payload: LoginSocialRequestDto) {
    return this.authService.loginSocial(payload);
  }
}
