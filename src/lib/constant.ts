export const API_SERVICES = {
  auth: process.env.NEXT_PUBLIC_AUTH_SERVICE as string,
  order: process.env.NEXT_PUBLIC_ORDER_SERVICE || "http://localhost:5002",
  payment: process.env.NEXT_PUBLIC_PAYMENT_SERVICE || "http://localhost:5003",
};