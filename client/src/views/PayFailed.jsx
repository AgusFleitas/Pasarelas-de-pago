import { Link } from 'react-router-dom'

import error from '../img/error.webp'

const PayFailed = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-8">Pago no realizado</h1>
            <div className="border-2 bg-white border-sky-300/60 rounded-md w-96 flex flex-col justify-center items-center py-4 p-8 shadow-md shadow-gray-400">
                <strong className="text-2xl mb text-red-500">¡Oh no!</strong>
                <p className='text-center'>La operación no pudo concretarse, el pago ha sido cancelado.</p>
                <img className="my-6 opacity-70" src={error} alt="Ilustración de una equis roja dentro de un círculo que indica un error." />
                <Link className="bg-sky-300/60 rounded-md py-1 px-3 w-32 text-center font-semibold hover:bg-sky-400/60 transition-colors" to="/">Ir al inicio</Link>
            </div>
        </section>
    )
}

export default PayFailed