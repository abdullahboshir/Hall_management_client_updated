 
import { authKey } from "@/constant/authKey";
import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { TGenericErrorResponse, TResponseSuccess } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local.storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 15000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
    // @ts-expect-error no need to worry about this error
  function (response) {
    const responseObject: TResponseSuccess = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };

    return responseObject;
  },
  async function (error) {
    const config = error.config;
    console.log("GOT AN ERROR FROM axios Instance File", error);
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
         setAccessToken(accessToken);
      return instance(config);
    } else {
      const responseErrorObject: TGenericErrorResponse = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong!!",
        errorMessages: error?.response?.data?.message,
      };
      return Promise.reject(responseErrorObject);
    }
  }
);

export { instance };
