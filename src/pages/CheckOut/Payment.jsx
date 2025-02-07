import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

function Payment({ bioObj }) {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm bioObj={bioObj} />
      </Elements>
    </div>
  );
}

export default Payment;
