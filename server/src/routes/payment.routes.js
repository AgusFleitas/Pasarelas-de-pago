import { Router } from "express";
import {createPayment, createPreference, createSession, getPaymentInfoMP, getPaymentInfoPP, receiveNotification } from "../controllers/payment.controllers.js";

// Inicializamos el enrutador con el Router que importamos de Express.
const router = Router();

// Ruta de consulta para el servidor.
router.get('/', (req, res) => {
    res.send('<h1>Está funcionando</h1>')
})

// MercadoPago.
router.post("/create-preference", createPreference)
router.post('/webhooks', receiveNotification)
router.post('/get-payment-mercadopago', getPaymentInfoMP)

// PayPal.
router.post("/create-payment", createPayment)
router.post("/get-payment-paypal", getPaymentInfoPP)

// Stripe.
router.post("/create-session", createSession)
export default router;
