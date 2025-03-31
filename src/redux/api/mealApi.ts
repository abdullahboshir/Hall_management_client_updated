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

    getSingleMeal: build.query({
      query: (mealId: any) => ({
        url: `/meal/getSingleMeal/${mealId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.meal],
    }),

    updateMealStatus: build.mutation({
      query: ({ body, id }) => ({
        url: `/meal/meal-status/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [tagTypes.meal],
    }),

    updateDueMaintenanceFee: build.mutation({
      query: ({ body, id }) => ({
        url: `/meal/updateMaintenanceFee/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [tagTypes.meal],
    }),

    addDeposit: build.mutation({
      query: ({ body, id }) => ({
        url: `/meal/addDeposit/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [tagTypes.meal],
    }),
  }),
});

export const {
  useGetAllMealQuery,
  useGetSingleMealQuery,
  useUpdateMealStatusMutation,
  useUpdateDueMaintenanceFeeMutation,
  useAddDepositMutation,
} = mealApi;
