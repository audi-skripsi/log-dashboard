export interface BaseError {
  code: number;
  message: string;
}

export interface BaseResponse<T> {
  data: T;
  error?: BaseError;
}

export interface MicroserviceName {
  id: string;
  name: string;
}

export interface GetMicroserviceNameResponse {
  microservices: MicroserviceName[];
}

export interface MicroserviceDataCount {
  totalEventData: number;
  totalInfoEventData: number;
  totalWarnEventData: number;
  totalErrorEventData: number;
  totalUnknownEventData: number;
}

export interface GetMicroserviceAnalyticsResponse {
  eventDataCount: MicroserviceDataCount;
}

export interface EventData {
  uid: string;
  level: string;
  message: string;
  serviceName: string;
  timestamp: number;
}

export interface GetMicroserviceEventDataResponse {
  totalEventData: number;
  events: EventData[];
}

export const isBaseError = (data: any): data is BaseError => {
  if (data.code && data.message) {
    return true;
  }
  return false;
};
