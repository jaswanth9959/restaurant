import { MENU_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: MENU_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getItemById: builder.query({
      query: (id) => ({
        url: `${MENU_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `${MENU_URL}/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Menu"],
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: `${MENU_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: `${MENU_URL}/${data.itemId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMenuQuery,
  useDeleteItemMutation,
  useCreateItemMutation,
  useUploadImageMutation,
  useUpdateItemMutation,
  useGetItemByIdQuery,
} = menuApiSlice;
