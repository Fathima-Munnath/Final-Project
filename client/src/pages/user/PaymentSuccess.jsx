export const PaymentSuccess =()=> {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
            </div>
        </div>
    );
}
