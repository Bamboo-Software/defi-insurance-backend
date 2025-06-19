import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig: { uri: string; options: MongooseModuleOptions } = {
  uri: process.env.MONGODB_URI,
  options: {
    // connectionName: 'MONGODB_DEFAULT',
  },
};
