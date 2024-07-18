import { Router } from "express";
import { createPreference } from "../controllers/payment.controllers.js";

// Inicializamos el enrutador con el Router que importamos de Express.
const router = Router();

// Creamos las rutas para el pago.
router.get('/', (req, res) => {
    res.send('<h1>Está funcionando</h1>')
})

router.post("/create-preference", createPreference)

export default router;
