import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";

export default function CheckoutForm({ contest }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const {user} = UseAuth()
  const totalPrice = parseInt(contest.prizeMoney);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
      // confirm payment
   const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",

        }
    }
})
if(confirmError){
    console.log("confirm error")
}
else{
    console.log('payment intent', paymentIntent)
    if(paymentIntent.status === "succeeded"){
    console.log("transaction id", paymentIntent.id)
    setTransactionId(paymentIntent.id)
    const payment = {
      email: user?.email,
      name:user?.displayName,
      price: totalPrice,
      transactionId: paymentIntent.id,
      paymentStatus: 'success',
      contestName: contest.name,
      deadline: contest.contestDeadline
    }

    const res = await axiosSecure.post('/payment', payment)
    if(res.data?.insertedId){
      toast.success('Payment Success')
    }

    const res2 = await axiosSecure.patch(`/participationCount/${contest._id}`)
    console.log(res2.data)



    }


}
  };


  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",

              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="text-center">
        <button
          className="btn mt-4 btn-primary w-44 text-white text-lg"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && <p className="text-green-500">Your transaction id:{transactionId}</p>}
      </div>
    </form>
  );
}
