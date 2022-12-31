import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./PlansScreen.css";
import {
  query,
  addDoc,
  where,
  getDocs,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getDocs(
      query(
        collection(doc(collection(db, "customers"), user.uid), "subscriptions")
      )
    ).then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  useEffect(() => {
    getDocs(
      query(collection(db, "products"), where("active", "==", true))
    ).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  const loadCheckOut = async (priceId) => {
    const docRef = await addDoc(
      collection(
        doc(collection(db, "customers"), user.uid),
        "checkout_sessions"
      ),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MKaWSFUZ3s9MVa3lubNVtFmGfTNBwrYrqQeXatrmvCaSnu6a1S93LPgkPDrFFZ1AZ7RH0GGj7QEKO8zsaswc4PF00L5ripeG9"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        //TODO add some logic to check if user subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckOut(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
