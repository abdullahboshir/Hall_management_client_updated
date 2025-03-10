/* eslint-disable @typescript-eslint/no-explicit-any */
// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const mealApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMeal: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/meal/getMeals",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          meals: response,
          meta,
        };
      },
      providesTags: [tagTypes.meal],
    }),

    updateMealStatus: build.mutation({
      query: (id) => ({
        url: `/meal/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.meal],
    }),
  }),
});

export const { useGetAllMealQuery, useUpdateMealStatusMutation } = mealApi;
