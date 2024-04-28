import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    createCounterOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/counter`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
      }),
    }),
    getPayPalClientid: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `${ORDERS_URL}/mine/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "PUT",
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
    getOnlineOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/online`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
    getCounterOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/counter`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetPayPalClientidQuery,
  useGetMyOrdersQuery,
  useGetCounterOrdersQuery,
  useGetOnlineOrdersQuery,
  useCreateCounterOrderMutation,
} = ordersApiSlice;
