import { Axios, AxiosError } from "axios";
import APP_CONFIG from "../../config/appconfig";
import {
  BaseResponse,
  GetMicroserviceNameResponse,
  BaseError,
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
};

export default LambdaAPI;
