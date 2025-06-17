/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { centrifugoConfig } from '@/config';
import { JwtService } from '@nestjs/jwt';
import { IRealtimeEvent } from '../../../common/interfaces/IRealtimeEvent';

@Injectable()
export class CentrifugoApiService {
  protected readonly http: AxiosInstance;
  protected readonly logger = new Logger(CentrifugoApiService.name);

  constructor(private readonly jwtService: JwtService) {
    this.http = axios.create({
      baseURL: centrifugoConfig.apiUrl + '/api',
      headers: {
        'X-API-Key': centrifugoConfig.apiKey,
      },
    });
  }

  getChannelName(ch: string): string {
    return `${centrifugoConfig.prefixChannelName}${ch}`;
  }

  getPersonalChannel(userId: string) {
    return `${centrifugoConfig.personalChannelNamespace ? centrifugoConfig.personalChannelNamespace + ':' : ''}#${centrifugoConfig.prefixChannelName}${userId}`;
  }

  getConnectionToken(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: centrifugoConfig.tokenSecret,
      expiresIn: '1d',
    });
  }

  getSubscriptionToken(channel: string, payload: Record<string, any>) {
    return this.jwtService.sign(
      { ...payload, channel },
      {
        secret: centrifugoConfig.subscriptionTokenSecret,
        expiresIn: '1d',
      },
    );
  }

  async publish(channel: string, data: any, options?: Record<string, any>) {
    return this.http.post('/publish', {
      ...options,
      channel,
      data,
    });
  }

  async broadcast(
    channels: string[],
    data: any,
    options?: Record<string, any>,
  ) {
    return this.http.post('/broadcast', {
      ...options,
      channels,
      data,
    });
  }

  sendMessageToUser(userId: string, data: IRealtimeEvent) {
    return this.publish(this.getPersonalChannel(userId), data);
  }

  sendMessageToUsers(userIds: string[], data: IRealtimeEvent) {
    const channels = userIds.map((userId) => this.getPersonalChannel(userId));
    return this.broadcast(channels, data);
  }
}
