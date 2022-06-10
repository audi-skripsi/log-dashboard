import { Axios, AxiosError } from "axios";
import APP_CONFIG from "../../config/appconfig";
import {
  BaseResponse,
  GetMicroserviceNameResponse,
  BaseError,
  GetMicroserviceAnalyticsResponse,
  GetMicroserviceEventDataResponse,
} from "./external-types";

const axios = new Axios({
  baseURL: APP_CONFIG.BACKEND_URL,
});

const LambdaAPI = {
  getMicroservicesName: async (): Promise<
    GetMicroserviceNameResponse | BaseError
  > => {
    try {
      const response = await axios.get("/v1/microservices");

      const resp = JSON.parse(
        response.data
      ) as BaseResponse<GetMicroserviceNameResponse>;
      return resp.data;
    } catch (e) {
      console.error(e);
      const errResp = e as AxiosError;
      if (!errResp.response?.data) {
        return {
          code: 500,
          message: `${e}`,
        };
      }

      return errResp.response!.data as BaseError;
    }
  },

  getMicroservicesAnalytics: async (
    id: string
  ): Promise<GetMicroserviceAnalyticsResponse | BaseError> => {
    try {
      const response = await axios.get(`/v1/microservice/${id}/analytics`);

      const resp = JSON.parse(
        response.data
      ) as BaseResponse<GetMicroserviceAnalyticsResponse>;
      return resp.data;
    } catch (e) {
      console.error(e);
      const errResp = e as AxiosError;
      if (!errResp.response?.data) {
        return {
          code: 500,
          message: `${e}`,
        };
      }

      return errResp.response!.data as BaseError;
    }
  },

  getMicroserviceEventData: async (
    id: string,
    message: string,
    level: string,
    timeStart: number,
    timeEnd: number
  ): Promise<GetMicroserviceEventDataResponse | BaseError> => {
    try {
      let query = `/v1/microservice/${id}/events?message=${message}`;

      console.log(level);

      if (level !== "") {
        query += `&level=${level}`;
      }

      if (timeStart !== 0) {
        query += `&timeStart=${timeStart}`;
      }

      if (timeEnd !== 0) {
        query += `&timeEnd=${timeEnd}`;
      }

      console.log(query);

      const response = await axios.get(query);

      const resp = JSON.parse(
        response.data
      ) as BaseResponse<GetMicroserviceEventDataResponse>;
      return resp.data;
    } catch (e) {
      console.error(e);
      const errResp = e as AxiosError;
      if (!errResp.response?.data) {
        return {
          code: 500,
          message: `${e}`,
        };
      }

      return errResp.response!.data as BaseError;
    }
  },
};

export default LambdaAPI;
