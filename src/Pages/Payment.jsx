import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
export default function Payment() {
    const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const prizeMoney = queryParams.get("prizeMoney");
  const searchParams = new URLSearchParams(location.search);
  const contest = Object.fromEntries(searchParams.entries());




  return (
    <div>
      <div className="bg-white mt-16 p-12 mx-36 ">
        <div>
          <h2 className="text-3xl font-cinzel font-bold text-[#151515] uppercase text-center mb-12">
            PAYMENT
          </h2>
        </div>
        <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm contest={contest}></CheckoutForm>
            </Elements>
        </div>

      </div>
    </div>
  )
}
