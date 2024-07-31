import { Router } from "express";
import { capturePayment, createPayment, createPreference, receiveNotification } from "../controllers/payment.controllers.js";

// Inicializamos el enrutador con el Router que importamos de Express.
const router = Router();

// Creamos las rutas para el pago.
router.get('/', (req, res) => {
    res.send('<h1>Está funcionando</h1>')
})

// MercadoPago.
router.post("/create-preference", createPreference)
router.post('/webhooks', receiveNotification)

// PayPal.
router.post("/create-payment", createPayment)
router.get("/payment-success", capturePayment)

export default router;
