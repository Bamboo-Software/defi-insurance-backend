/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Logger } from '@nestjs/common';
import { HandleAvalancheContractService } from '../services/avalanche-contract.service';
import { OnEvent } from '@nestjs/event-emitter';
import { AvalancheEventEnum } from '../../../common';

@Controller()
export class AvalancheContractController {
  private readonly logger = new Logger(AvalancheContractController.name);

  constructor(
    private readonly handleAvalancheContractService: HandleAvalancheContractService,
  ) {}

  /**
   * Handles incoming Avalanche contract events.
   * This endpoint listens to events from the configured Avalanche contract queue topic
   * and triggers the appropriate service to process the provided payload.
   */

  @OnEvent(AvalancheEventEnum.BuyInsurance)
  processBuyInsurance(payload: any) {
    this.logger.log(
      'processAvalancheBuyInsurance payload: ' + JSON.stringify(payload),
    );
    this.handleAvalancheContractService.handleBuyInsurance(payload);
  }

  @OnEvent(AvalancheEventEnum.FetchWeatherData)
  fetchWeatherData(payload: any) {
    this.logger.log('fetchWeatherData payload: ' + JSON.stringify(payload));
    this.handleAvalancheContractService.fetchWeatherData(payload);
  }

  @OnEvent(AvalancheEventEnum.ProcessPayout)
  processPayout(payload: any) {
    this.logger.log('processPayout payload: ' + JSON.stringify(payload));
    this.handleAvalancheContractService.processPayout(payload);
  }
}
