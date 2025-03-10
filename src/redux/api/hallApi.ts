// import { tagTypesList } from "../tag-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const hallApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllHalls: build.query({
      query: () => ({
        url: "/hall/getAllHalls",
        method: "GET",
      }),
      providesTags: [tagTypes.hall],
    }),
  }),
});

export const { useGetAllHallsQuery } = hallApi;
