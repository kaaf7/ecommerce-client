/* * 👇
 *This is Cart Page
 *Created and styled with Styled Component
 *It will display the purchased items inform of Cartitem compoCFnent
 */

// import react
import React from "react";
// import Styled Components
import styled from "styled-components";

// import responsive Settings from responsive.js
import { mobile,tablet } from "../responsive";
// import cartItem component that will display purchased products

import CartItem from "../Components/CartItem";
// import navvbar component for navigation
import { Navbar } from "../Components/Navbar";

// import useSelector to get states from redux slices
import { useSelector } from "react-redux";

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
  font-family: "Lendex", sans-serif;
  margin-top: .1vh;
  
  ${mobile({
    fontSize: "1.5vw",
    flexDirection: "column",
  })}
  
  ${tablet({
    fontSize: "1.5vw",
    flexDirection: "column",
  })}
`;

// buy button
const PurchaseButton = styled.button`
  width: 100%;
  height: 5vh;
  font-family: "Lendex", sans-serif;
  background-color: black;
  font-weight: 100;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: grey;
  }
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
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: center;

  ${mobile({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  font-family: "Lendex", sans-serif;
  font-size: 2vh;
  ${mobile({
    fontSize: "1vh",
  })}
  ${tablet({
    fontSize: "1vh",
  })}
`;

const Cart = () => {
  // get cart state from redux Cart Slice
  const cart = useSelector((state) => state.cart);
  // get cart prodts array
  const cartProducts = cart.products;
  // round total from cart state price
  const totalPrice = Math.round(cart.price);
  // shipping cost
  const shippingCost = 5;

  return (
    <Container>
      <Navbar />
      {
        <Wrapper>
          {/* mapp all purchased products into CartItem component*/}
          <PurchasedItems>
            {cartProducts.map((product) => (
              <CartItem key={product.uniqueId} purchasedProduct={product} />
            ))}
          </PurchasedItems>
          {cartProducts.length > 0 && (
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
              <PurchaseButton>GO TO CHECKOUT</PurchaseButton>
            </PurchaseForm>
          )}
        </Wrapper>
      }
    </Container>
  );
};

export default Cart;
