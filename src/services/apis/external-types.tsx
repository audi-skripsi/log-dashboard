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

export const isBaseError = (data: any): data is BaseError => {
  if (data.code && data.message) {
    return true;
  }
  return false;
};
