import axios from "axios";
import Stripe from "stripe";

import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import {
  CLIENT_HOST,
  MP_ACCESS_TOKEN_TEST,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET,
  PAYPAL_API,
  STRIPE_SECRET_KEY,
} from "../config.js";

// 💙 MercadoPago 💙
export const createPreference = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN_TEST,
    });

    const { products, reference } = req.body;

    const itemList = products.map((product) => {
      return {
        id: product.id,
        title: product.name,
        quantity: product.quantity,
        unit_price: product.price,
        currency_id: product.currency,
        description: product.description,
        category: product.category,
        picture_url: product.image,
      };
    });

    const body = {
      items: itemList,
      external_reference: reference,
      statement_descriptor: "AgusFleitas TestingShop",
      back_urls: {
        success: `${CLIENT_HOST}/payment-success`,
        failure: `${CLIENT_HOST}/payment-cancel`,
        pending: `${CLIENT_HOST}/payment-pending`,
      },
      auto_return: "approved",
      // notification_url: 'https://4446-84-77-121-226.ngrok-free.app/webhooks'
    };

    const preference = new Preference(client);

    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log("Ha ocurrido un error en la operación");
    console.log(error);
  }
};

export const receiveNotification = (req, res) => {
  console.log("Notificación recibidia! 🤩");
  const payment = req.query;
  console.log(payment);

  // try {
  //   const notification = req.body;

  //   switch (notification.type) {
  //     case "payment":
  //       // Procesar notificación de pago
  //       break;
  //     case "delivery":
  //       // Procesar notificación del envío
  //       break;
  //     // Agregar más casos según sea necesario
  //     default:
  //       console.log(`Tipo de notificación desconocida: ${notification.type}`);
  //   }

  //   // Responder con status 200 para confirmar la recepción
  //   res.sendStatus(200);
  // } catch (error) {
  //   console.log("Ha ocurrido un error en la operación");
  //   console.log(error);
  // }

  res.sendStatus(200);
};

export const getPaymentInfoMP = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN_TEST,
    });

    const payment = new Payment(client);
    const { paymentID } = req.body;

    const response = await payment.get({
      id: paymentID,
    });

    res.json(response);
  } catch (error) {
    console.log("Ha ocurrido un error al obtener la información del pago");
    console.error(error.message);

    res.json(error.message);
  }
};

// 🤍 PayPal 🤍

export const createPayment = async (req, res) => {
  const { items } = req.body;

  const itemList = items.map((item) => {
    return {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unit_amount: {
        currency_code: item.currency,
        value: item.price,
      },
    };
  });

  const itemsTotal = items.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    const quantity = parseInt(item.quantity);

    return acc + itemPrice * quantity;
  }, 0);

  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: itemList,
        amount: {
          currency_code: "USD",
          value: itemsTotal.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: itemsTotal.toFixed(2),
            },
          },
        },
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          brand_name: "Fleitas Shop",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${CLIENT_HOST}/payment-success`,
          cancel_url: `${CLIENT_HOST}/payment-cancel`,
        },
      },
    },
  };

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_SECRET,
    },
  });

  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json(response.data);
};

export const getPaymentInfoPP = async (req, res) => {
  const { paymentID } = req.body; 

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET,
      },
    });

    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paymentID}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    
    return res.json(response.data);
  } catch (error) {
    console.log("Ha ocurrido un error al obtener la información del pago");
    console.error(error.message);

    res.json(error.message);
  }
};

// 💜 Stripe 💜

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  const { items } = req.body;

  // Productos.
  const lineItems = items.map((product) => {
    return {
      price_data: {
        product_data: {
          name: product.name,
          description: product.description,
        },
        currency: product.currency,
        unit_amount: product.price * 100, // Se multiplica por 100 para convertirlo a centavos debido a cómo opera Stripe.
      },
      quantity: product.quantity,
    };
  });

  // Sesión.
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${CLIENT_HOST}/payment-success`,
    cancel_url: `${CLIENT_HOST}/payment-cancel`,
  });

  // Retorno.
  return res.json(session);
};
