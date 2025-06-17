import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  ObjectId,
  Query,
  SchemaTypes,
  Types,
  Schema as MongooseSchema,
} from 'mongoose';
import { Model } from './Model';
import { RoleTypeEnum } from '../../../common/enums';
import bcrypt from 'bcryptjs';
import randomize from 'randomatic';
import { isPasswordHashed } from '../../../utils';
import { UserSocial } from './user-social.schema';
// import { Transaction } from './transaction.schema';
// import { Referral } from './referral.schema';

@Schema({
  collection: 'users',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true },
})
export class User extends Model {
  //* Move telegramId as socialId at User Social Schema
  // @Prop({ type: Number, required: true, sparse: true, unique: true })
  // telegramId: number;

  @Prop({ type: String, sparse: true, index: true })
  firstName?: string;

  @Prop({ type: String, sparse: true, index: true })
  lastName?: string;

  @Prop({ type: String, sparse: true, index: true })
  name?: string;

  @Prop({ type: String, sparse: true, index: true })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, sparse: true, index: true })
  email?: string;

  @Prop({ type: Boolean, default: false })
  emailVerified?: boolean;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: Boolean, default: false })
  phoneVerified?: boolean;

  @Prop({ type: Boolean, default: false })
  active?: boolean;

  @Prop({ type: String, required: false })
  telegramLanguageCode?: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String, enum: RoleTypeEnum, default: RoleTypeEnum.User })
  role?: RoleTypeEnum;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: String, sparse: true, index: true, unique: true })
  referralCode?: string;

  @Prop({ type: Boolean, default: null })
  isTelegramPremium?: boolean;

  @Prop({ type: String })
  estimatedTelegramAccountAge?: string;

  @Prop({ type: Boolean, default: false })
  isOnboarded: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    index: true,
    sparse: true,
  })
  botId?: string;

  @Prop({ type: Boolean, default: false })
  isBot?: boolean;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    default: 0,
    get: (v: Types.Decimal128 | undefined) => {
      if (v === undefined || v === null) {
        return 0;
      }
      return parseFloat(v.toString());
    },
    set: (v: number) => new Types.Decimal128(v.toString()),
  })
  pointsBalance: number;

  @Prop({ type: String, default: 'UTC' })
  timezone?: string;

  @Prop({ type: Date, default: null })
  lastLoginAt?: Date;

  @Prop({ type: Number, default: 0 })
  failedLoginAttempts: number;

  @Prop({ type: Date, nullable: true })
  lastFailedLoginAttempt: Date;

  @Prop({ type: Number, default: 0 })
  lotteryEntries: number;

  @Prop({ type: Boolean, default: false })
  doublePointsActive?: boolean;

  @Prop({ type: Date, nullable: true })
  doublePointsExpiresAt: Date;

  transactionCount?: number;
  achievementCount?: number;
  asReferrerCount?: number;
  asRefereeCount?: number;
  referralCount?: number;
  socials?: UserSocial[]; // UserSocial[];

  checkPassword(passwd: string): boolean {
    return bcrypt.compareSync(passwd, this.password);
  }

  hasPassword(): boolean {
    return !!this.password;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

// Middleware to handle soft delete automatically
UserSchema.pre(/^find/, function (next) {
  const query = this as Query<any, any>;
  if (query.getFilter().deletedAt === undefined) {
    query.where({ deletedAt: null });
  }
  next();
});

UserSchema.pre('save', async function (next) {
  const user = this as User;

  if (
    user.isModified('password') &&
    user.password &&
    !isPasswordHashed(this.password)
  ) {
    user.password = bcrypt.hashSync(this.password, 10);
  }

  if (!user.referralCode) {
    let isUnique = false;
    let referralCode: string;

    while (!isUnique) {
      referralCode = randomize('A0', 8);
      const existingUser = await this.model('User').findOne({ referralCode });
      if (!existingUser) {
        isUnique = true;
      }
    }
    user.referralCode = referralCode;
  }
  next();
});

UserSchema.virtual('socials', {
  ref: 'UserSocial',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});

export type UserDocument = User & Document;
