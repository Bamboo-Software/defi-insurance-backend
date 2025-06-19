import { RealtimeEventEnum } from '@/common/enums';

export interface IRealtimeEventBase {
  event: RealtimeEventEnum;
  data?: any;
}

export type IRealtimeEvent = IRealtimeEventBase;
