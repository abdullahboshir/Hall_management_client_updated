// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const mealApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMeal: build.query({
      query: () => ({
        url: "/meal/getMeals",
        method: "GET",
      }),
      providesTags: [tagTypes.meal],
    }),
  }),
});

export const { useGetAllMealQuery } = mealApi;
