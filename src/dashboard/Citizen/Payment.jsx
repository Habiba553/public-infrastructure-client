import {

  CardElement,
  Elements,
  useElements,
  useStripe

} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  import.meta.env.VITE_PAYMENT_GATEWAY_PK
);
import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
const CheckoutForm = () => {

  const stripe = useStripe();

  const elements = useElements();

  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState('');

  const [processing, setProcessing] = useState(false);

  const premiumAmount = 1000;



  useEffect(() => {

    axios.post(

      'http://localhost:5000/create-payment-intent',

      {
        amount: premiumAmount
      }

    )
    .then(res => {

      setClientSecret(res.data.clientSecret);
    });

  }, []);



  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }



    const card = elements.getElement(CardElement);

    if (!card) {

      return;
    }



    setProcessing(true);



    const { error } = await stripe.createPaymentMethod({

      type: 'card',

      card
    });



    if (error) {

      Swal.fire({
        icon: 'error',
        title: error.message
      });

      setProcessing(false);

      return;
    }

    const result = await stripe.confirmCardPayment(

      clientSecret,

      {
        payment_method: {

          card,

          billing_details: {

            email: user.email,

            name: user.displayName
          }
        }
      }
    );



    if (result.error) {

      Swal.fire({
        icon: 'error',
        title: result.error.message
      });

      setProcessing(false);

      return;
    }



    if (result.paymentIntent.status === 'succeeded') {

      await axios.patch(
        `http://localhost:5000/users/premium/${user.email}`
      );



      Swal.fire({
        icon: 'success',
        title: 'Payment Successful'
      });

      setProcessing(false);
    }
  };



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <CardElement />

      <button
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary mt-5"
      >

        {
          processing
            ? 'Processing...'
            : `Pay $${premiumAmount}`
        }

      </button>

    </form>
  );
};
const Payment = () => {

  return (

    <div className="max-w-xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">

        Upgrade To Premium

      </h1>

      <Elements stripe={stripePromise}>

        <CheckoutForm />

      </Elements>

    </div>
  );
};

export default Payment;