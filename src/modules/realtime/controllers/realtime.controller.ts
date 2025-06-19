/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkResponse, AuthUser, UseGuardAuth } from '../../../decorators';
import { User } from '../../database';
import { CentrifugoApiService } from '../../core/services/centrifugo-api.service';
import {
  RealtimeSubscriptionTokenRequestDto,
  RealtimeTokenDto,
} from '../dto/realtime-token.dto';

@ApiTags('realtime')
@Controller('realtime')
@UseGuardAuth()
export class RealtimeController {
  constructor(private readonly centrifugoApiService: CentrifugoApiService) {}

  /**
   * Retrieves a connection token.
   * This endpoint generates and returns a realtime connection token for the authenticated user.
   */
  @Post('token')
  @ApiOkResponse({
    type: RealtimeTokenDto,
  })
  getToken(@AuthUser() user: User) {
    const token = this.centrifugoApiService.getConnectionToken({
      sub: this.centrifugoApiService.getChannelName(user.id),
      info: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    return {
      token,
    };
  }

  /**
   * Retrieves a subscription token.
   * This endpoint generates and returns a realtime subscription token for the specified channel,
   * using the authenticated user's details.
   */
  @Post('subscription-token')
  @ApiOkResponse({
    type: RealtimeTokenDto,
  })
  getSubscriptionToken(
    @AuthUser() user: User,
    @Body() payload: RealtimeSubscriptionTokenRequestDto,
  ) {
    const token = this.centrifugoApiService.getSubscriptionToken(
      payload.channel,
      {
        sub: this.centrifugoApiService.getChannelName(user.id),
        info: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    );

    return {
      token,
    };
  }
}
