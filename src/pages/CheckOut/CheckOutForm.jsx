import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

function CheckOutForm({ bioObj }) {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  bioObj;

  const { name, BioId, mobile, email, type } = bioObj || {};

  useEffect(() => {
    if (user) {
      axiosSecure.post("/create-payment-intent", { price: 5 }).then((res) => {
        res.data.clientSecret;
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      "[error]", error;
      setError(error.message);
    } else {
      "[PaymentMethod]", paymentMethod;
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      ("confirm error");
    } else {
      paymentIntent;

      if (paymentIntent.status === "succeeded") {
        "transaction id", paymentIntent.id;
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          price: 5,
          status: "pending",
        };

        const biodata = {
          name: user.displayName,
          id: BioId,
          phone: mobile,
          bioemail: email,
          status: "pending",
          email: user?.email,
        };
        biodata;

        const res = await axiosSecure.post("/payments", payment);
        const res2 = await axiosSecure.post("/mycontactrequest", biodata);

        if (res.data?.insertedId) {
          res.data.insertedId;
          toast.success("Payment Successfull");
          //   navigate("/dashboard/paymentHistory");
        }
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
      <button
        className="px-2 py-1 w-full bg-amber-500 text-white"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay $5
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default CheckOutForm;
