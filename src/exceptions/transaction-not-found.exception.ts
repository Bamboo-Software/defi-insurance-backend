/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class TransactionNotFoundException extends HttpException {
  constructor() {
    super('Transaction not found', HttpStatus.BAD_REQUEST);
  }
}
