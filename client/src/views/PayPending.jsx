import { Link } from 'react-router-dom'
import warning from '../img/warning.webp'

const PayPending = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl text-center text-balance mb-8">Pago pendiente</h1>
            <div className="border-2 bg-white border-sky-300/60 rounded-md md:w-96 flex flex-col justify-center items-center py-4 p-8 shadow-md shadow-gray-400">
                <strong className="text-2xl mb-2 text-yellow-500">Pago pendiente</strong>
                <p className='text-center text-pretty'>Tu pago está pendiente, será aprobado una vez recibamos la transacción.</p>
                <img className="my-6 opacity-70" src={warning} alt="Ilustración de un símbolo de advertencia que indica un pago pendiente." />
                <Link className="bg-sky-300/60 rounded-md py-1 px-3 w-32 text-center font-semibold hover:bg-sky-400/60 transition-colors" to="/">Ir al inicio</Link>
            </div>
        </section>
    )
}

export default PayPending