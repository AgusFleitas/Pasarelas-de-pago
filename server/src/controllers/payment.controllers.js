import { MercadoPagoConfig, Preference } from "mercadopago";
import { ACCESS_TOKEN_TEST } from "../config.js";

export const createPreference = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN_TEST,
    });

    const { products } = req.body;

    const itemList = products.map((product) => {
      return {
        title: product.name,
        quantity: product.quantity,
        unit_price: product.price,
        currency_id: product.currency,
        description: product.description,
        picture_url: product.image
      };
    });

    const body = {
      items: itemList,
      statement_descriptor: "AgusFleitas TestingShop",
      back_urls: {
        success: "https://www.instagram.com/",
        failure: "https://www.linkedin.com/feed/",
        pending: "https://guitarflash.com/",
      },
      auto_return: "approved",
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