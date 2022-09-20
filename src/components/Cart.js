import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { urlFor } from "../client";
import GooglePayButton from "@google-pay/button-react";
function Cart({ setShowModal }) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem("cart"));
    setProducts(arr);
    // calculating total price
    let pr = 0;
    arr.forEach(({ price, quantity }) => {
      pr += price * quantity;
    });
    setTotalPrice(+pr.toFixed(2));
  }, []);
  function disableModal() {
    setShowModal(false);
    const body = document.querySelector("body");
    body.classList.remove("modal-active");
  }
  function getCart() {
    return JSON.parse(window.localStorage.getItem("cart"));
  }
  function saveCart(arr) {
    window.localStorage.setItem("cart", JSON.stringify(arr));
    setProducts(arr);
  }
  function handleDelete(productIndex) {
    let arr = getCart();
    const { price, quantity } = arr[productIndex];
    setTotalPrice((old) => +(old - price * quantity.toFixed(2)).toFixed(2));
    arr.splice(productIndex, 1);
    saveCart(arr);
  }
  function handleColorChange(productIndex, color) {
    let arr = getCart();
    arr = arr
      .slice(0, productIndex)
      .concat({ ...arr[productIndex], chosenColor: color })
      .concat(arr.slice(productIndex + 1));
    saveCart(arr);
  }
  function decrementQuantity(productIndex) {
    if (products[productIndex].quantity > 1) {
      let arr = getCart();
      let quantity = arr[productIndex].quantity;
      quantity--;
      arr = arr
        .slice(0, productIndex)
        .concat({ ...arr[productIndex], quantity })
        .concat(arr.slice(productIndex + 1));
      saveCart(arr);
      setTotalPrice((old) => +(old - arr[productIndex].price).toFixed(2));
    }
  }
  function incrementQuantity(productIndex) {
    let arr = getCart();
    let quantity = arr[productIndex].quantity;
    quantity++;
    arr = arr
      .slice(0, productIndex)
      .concat({ ...arr[productIndex], quantity })
      .concat(arr.slice(productIndex + 1));
    saveCart(arr);
    setTotalPrice((old) => +(old + arr[productIndex].price).toFixed(2));
  }

  return (
    <div onClick={disableModal}>
      <ul
        onClick={(e) => {
          e.stopPropagation();
        }}
        id="cart"
        className="flex flex-col bg-softbackground max-h-[90vh] w-[90vw] lg:max-w-md rounded-lg p-6 overflow-y-scroll"
      >
        <li className="flex justify-between items-center">
          <h3 className="text-primary font-medium text-lg">Cart</h3>
          <button className=" text-softblack text-lg" onClick={disableModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </li>
        {products.length > 0 ? (
          <div className="mt-6">
            {products.map(
              (
                { id, image, title, colors, chosenColor, quantity, price },
                productIndex
              ) => {
                return (
                  <li className="flex items-center mb-6" key={id}>
                    <div className="relative">
                      <img
                        key={id}
                        src={urlFor(image)}
                        className=" w-16 border-2 border-border mr-4 rounded-md"
                        alt=""
                      />
                      <button
                        className="absolute -top-1 -left-1 text-primary"
                        onClick={handleDelete.bind(null, productIndex)}
                      >
                        <FontAwesomeIcon icon={faXmarkCircle} />
                      </button>
                    </div>
                    <div>
                      <div className=" text-text font-medium">{title}</div>
                      <p className="text-sm my-1">
                        {(price * quantity).toFixed(2)}${" "}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {colors.slice(1).map((color) => (
                          <span
                            style={{ backgroundColor: `#${color}` }}
                            key={color}
                            onClick={handleColorChange.bind(
                              null,
                              productIndex,
                              color
                            )}
                            className={`w-4 h-4 rounded-full cursor-pointer ${
                              color !== chosenColor ? " opacity-30" : ""
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center gap-1">
                        <button
                          className={`text-primary ${
                            quantity === 1 ? "opacity-40 cursor-default" : ""
                          }`}
                          onClick={decrementQuantity.bind(null, productIndex)}
                        >
                          <FontAwesomeIcon icon={faMinusCircle} />
                        </button>
                        <span className=" font-medium text-text">
                          {quantity}
                        </span>
                        <button
                          className="text-primary"
                          onClick={incrementQuantity.bind(null, productIndex)}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
            <li className=" mt-7 flex justify-between items-center">
              <p>Total price</p>
              <p>{totalPrice} $</p>
            </li>
            <GooglePayButton
              className="w-full mt-4"
              environment="TEST"
              buttonColor="white"
              buttonSizeMode="fill"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: `${totalPrice}`,
                  currencyCode: "USD",
                  countryCode: "US",
                },
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
            />
          </div>
        ) : (
          <h2 className="mt-2">Your cart is empty</h2>
        )}
      </ul>
    </div>
  );
}

export default Cart;
