import type { ValidationOptions } from 'class-validator';
import {
  IsPhoneNumber as isPhoneNumber,
  registerDecorator,
  ValidateIf,
} from 'class-validator';
import { isString } from 'lodash';
import { isValidObjectId } from 'mongoose';
import Web3 from 'web3';
import { PublicKey } from '@solana/web3.js';
import { PaymentProviderEnum } from '../common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Register required plugins for dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
        },
      },
    });
  };
}

export function IsPhoneNumber(
  validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(validationOptions?.region, {
    message: 'error.phoneNumber',
    ...validationOptions,
  });
}

export function IsTmpKey(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'tmpKey',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return isString(value) && value.startsWith('tmp/');
        },
        defaultMessage(): string {
          return 'error.invalidTmpKey';
        },
      },
    });
  };
}

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== undefined, options);
}

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== null, options);
}

export function IsEmptyable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf(
    (_obj, value) => value !== null && value !== undefined && value !== '',
    options,
  );
}

export function IsValidObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isValidObjectId',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return isValidObjectId(value);
        },
        defaultMessage(): string {
          return 'Invalid MongoDB ObjectId';
        },
      },
    });
  };
}

export function IsWalletAddress(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isWalletAddress',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string, args: any): boolean {
          const { object } = args;
          const provider = object.provider as PaymentProviderEnum;

          switch (provider) {
            case PaymentProviderEnum.Metamask:
              try {
                const web3 = new Web3();
                web3.utils.toChecksumAddress(value);
                return true;
              } catch (e) {
                return false;
              }

            case PaymentProviderEnum.Phantom:
              try {
                const publicKey = new PublicKey(value);
                return PublicKey.isOnCurve(publicKey.toBytes());
              } catch (e) {
                return false;
              }

            default:
              return false;
          }
        },
        defaultMessage(args: any): string {
          const { object } = args;
          const provider = object.provider as PaymentProviderEnum;
          return `Invalid wallet address for the selected provider: ${provider}.`;
        },
      },
    });
  };
}

/**
 * Custom decorator to validate timezone
 */
export function IsValidTimezone(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isValidTimezone',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: any) {
          const isValidTimezone = (tz: string): boolean => {
            try {
              // Check if timezone is valid
              return Boolean(dayjs().tz(tz));
            } catch (error) {
              return false;
            }
          };
          return typeof value === 'string' && isValidTimezone(value);
        },
        defaultMessage(args: any) {
          return `${args.property} must be a valid timezone`;
        },
      },
    });
  };
}
