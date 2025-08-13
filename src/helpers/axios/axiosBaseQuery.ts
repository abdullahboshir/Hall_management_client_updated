import { TMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: TMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
      });
      console.log('ggggggggggggggggggggg', result)
      if (!result || result?.data === undefined) {
        throw new Error("Invalid API response: No data received.");
      }
      // return { data: result?.data || {} };
      return result;
    } catch (axiosError) {
      const err = axiosError as any;
      console.log('Error from axios instance',  err)
      return {
        error: {
          status: err?.statusCode,
          data: err.response?.data || err.message,
        },
      };
    }
  };
