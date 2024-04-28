import { CAT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: CAT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // getPizzaByID: builder.query({
    //   query: (id) => ({
    //     url: `${MENU_URL}/${id}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
