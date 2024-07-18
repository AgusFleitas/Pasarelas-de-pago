import error from '../img/error.webp'

const PayFailed = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-8">Pago no realizado</h1>
            <div className="border-2 border-emerald-700 rounded-md w-96 flex flex-col justify-center items-center py-4 p-8 shadow-md shadow-slate-700">
                <strong className="text-2xl mb text-red-600">¡Oh no!</strong>
                <p>Ha habido un error al concretar el pago.</p>
                <img className="my-6" src={error} alt="Ilustración de una equis roja dentro de un círculo que indica un error." />
                <a className="bg-emerald-700/70 rounded-md py-1 px-3 w-32 text-center font-semibold mb-2 hover:scale-105 transition-transform" href="#">Ver detalles</a>
                <a className="border-2 border-emerald-700/70 rounded-md py-1 px-3 w-32 text-center font-semibold hover:scale-105 transition-transform" href="/">Ir al inicio</a>
            </div>
        </section>
    )
}

export default PayFailed