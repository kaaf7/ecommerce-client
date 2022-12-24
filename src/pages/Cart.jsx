/* * 👇
 *This is Cart Page
 *Created and styled with Styled Component
 *It will display the purchased items inform of Cartitem compoCFnent
 */

// import react
import React from "react";

// import Styled Components
import styled from "styled-components";

import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";

// import responsive Settings from responsive.js
import { mobile, tablet } from "../responsive";

// import cartItem component that will display purchased products
import CartItem from "../Components/CartItem";

// import navvbar component for navigation
import { Navbar } from "../Components/Navbar";

// import useSelector to get states from redux slices
import { useSelector } from "react-redux";

// import responsive back button
import ResBackButton from "../Components/ResBackButton";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Container that contains all of the components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// components wrapper
const Wrapper = styled.div`
  height: 70%;
  width: 100%;
  margin-right: 7.8125vw;
  margin-left: 7.8125vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// container for all purchased items
const PurchasedItems = styled.div`
  flex: 2;
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 1vh;
  ${mobile({
    display: "flex",
    flexDirection: "column",
  })}
  ${tablet({
    display: "flex",
    flexDirection: "column",
  })}
`;
// text for purchase information
const Text = styled.p`
  font-weight: 500;
  font-family: "Lexend", sans-serif;
  margin-top: 0.1vh;

  ${mobile({
    fontSize: "1vh",
    flexDirection: "column",
  })}

  ${tablet({
    fontSize: "1vh",
    flexDirection: "column",
  })}
`;

// buy button
const PurchaseButton = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Lexend", sans-serif;
  font-weight: 100;
  background-color: #ffffff;

  ${mobile({
    fontSize: "2vw",
  })}
  ${tablet({
    fontSize: "2vw",
  })}
`;

// order summery form
const PurchaseForm = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1vw;
  position: fixed;
  right: 7.8125vw;
  top: 15vh;
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: center;

  ${mobile({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "45vh",
  })}
  ${tablet({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  })}
`;

// order details
const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

// order title
const OrderTitle = styled.h2`
  margin-top: 0;
  font-family: "Lexend", sans-serif;
  font-size: 2vh;
  ${mobile({
    fontSize: "1vh",
  })}
  ${tablet({
    fontSize: "1vh",
  })}
`;

const EmptyCartSign = styled.p`
  display: flex;
  position: fixed;
  font-size: 3.5vw;
  top: 30%;
  width: 100%;
  height: 100%;
  font-family: "Lexend", sans-serif;
  color: #c40a0af5;
  font-weight: 400;
  justify-content: center;
`;

const PayPalPaymentButton = styled(PayPalButtons)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Lendex", sans-serif;
  font-weight: 100;
  cursor: pointer;
  &:hover {
  }
  ${mobile({
    fontSize: "2vw",
    transform: " scale(.5)",
  })}
  ${tablet({
    fontSize: "2vw",
  })}
`;
const Cart = () => {
  // get cart state from redux Cart Slice
  const cart = useSelector((state) => state.cart);
  // get cart prodts array
  const cartProducts = cart.products;
  // round total from cart state price
  const totalPrice = (Math.round(cart.price * 100) / 100).toFixed(2);
  // shipping cost
  const shippingCost = 5;

  return (
    <Container>
      <Navbar />

      {cartProducts?.length > 0 ? (
        <Wrapper>
          {/* mapp all purchased products into CartItem component*/}
          <PurchasedItems>
            {cartProducts?.map((product) => (
              <CartItem key={product.uniqueId} purchasedProduct={product} />
            ))}
          </PurchasedItems>
          {cartProducts?.length > 0 && (
            <PurchaseForm>
              <OrderTitle>ORDER SUMMERY</OrderTitle>
              <OrderDetails>
                <Text>ORDER SUM</Text>
                <Text>€ {totalPrice}</Text>
              </OrderDetails>
              <OrderDetails>
                <Text>SHIPPING SUM</Text>
                {/* if order is over 50 euros then shipping price is 0 else it is 5 euros*/}
                <Text>€ {totalPrice > 50 ? 0 : shippingCost}</Text>
              </OrderDetails>
              <OrderDetails>
                <Text>TOTAL ORDER</Text>
                {/* if order is over 50 then do not add shipping cost*/}
                <Text>
                  € {totalPrice > 50 ? totalPrice : totalPrice + shippingCost}
                </Text>
              </OrderDetails>
              <PurchaseButton>CHECK OUT WITH </PurchaseButton>
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalPaymentButton
                  style={{ width: "1%" }}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency:"EUR",
                              value:
                                totalPrice > 50
                                  ? totalPrice
                                  : totalPrice + shippingCost,
                            },
                          },
                        ],
                      })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                  }}
                  onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                      // Your code here after capture the order
                    });
                  }}
                >
                  {" "}
                </PayPalPaymentButton>
              </PayPalScriptProvider>
            </PurchaseForm>
          )}
        </Wrapper>
      ) : (
        <EmptyCartSign>
          CART IS EMPTY
          <SentimentVeryDissatisfiedOutlinedIcon />
        </EmptyCartSign>
      )}
      <ResBackButton />
    </Container>
  );
};

export default Cart;
