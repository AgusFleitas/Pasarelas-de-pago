import { config } from "dotenv";
config();

export const PORT = 3000;
// export const CLIENT_HOST = "http://localhost:5173";
export const CLIENT_HOST = 'https://pasarelas-de-pago-agustin-fleitas.vercel.app'

export const MP_ACCESS_TOKEN_TEST = process.env.MP_ACCESS_TOKEN_TEST;
export const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;