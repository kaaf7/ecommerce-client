/* * 👇
 *This is cart slice
 *Created with redux toolkit
 *it is responsible for updating cart products and quantity
 */

// import createSlice and asyncthunk functions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import private requests and current user if exists
import { privateRequest, currentUser } from "../services";
// get current userId if it exists
const userId = currentUser?._id;

/* updateCart createAsyncThunk function 
which is responsible for updating cart products, quantity, and price 
with action payload as a new cart whenever product is added or removed */
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cart, { rejectWithValue }) => {
    try {
      const res = await privateRequest.put(`/cart/update?id=${userId}`, cart);
      const updatedCart = res.data;
      return updatedCart;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
// cartSlice with intialstate of no products and price is 0
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    price: 0,
    productAdded: false,
    productRemoved: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  // getCart reducer which is dispatched on login from apiCalls/login page
  reducers: {
    getCart: (state, action) => {
      // get products with spread operator
      const productsArray = [...action.payload.products];
      // set state products as product array
      state.products = productsArray;
      // set quanitity as products quantity
      state.quantity = productsArray.quantity;
      // get sum price by summing all prices inside array using reduce array method
      let sumPrice = productsArray.reduce((acc, product) => {
        return acc + product.price;
      }, 0);
      state.price = sumPrice;
    },
    // addProduct is a reducer responsible for adding  products to cart
    addProduct: (state, action) => {
      // push action payload which is product into state products array
      state.products.push(action.payload);
      // increase state quanity by 1
      state.quantity += 1;
      // add the new added product price into the existing sum price
      state.price += action.payload.price;
      // product added is true
      state.productAdded = true;
      // product removed is false
      state.productRemoved = false;
    },
    // removeProduct is a reducer responsive for remove products from cart
    removeProduct: (state, action) => {
      // return back the product array without the product meant to be removed
      let updatedProducts = state.products.filter(
        (product) => product.uniqueId !== action.payload?.uniqueId
      );
      // assign state products as updatedProducts after product removal
      state.products = updatedProducts;
      // subtract 1 from quantity
      state.quantity -= 1;
      // subtract product's price from total price sum
      state.price -= action.payload.price;
      // product added is false
      state.productAdded = false;
      // product removed is true
      state.productRemoved = true;
    },
  },
  /* update cart extra reducer to updatecart which is an createAsyncThunk function it 
  will update cart on DB with every change happens either product is added or removed*/
  extraReducers: {
    [updateCart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCart.fulfilled]: (state, action) => {
      state.products = action.payload?.products;
      state.quantity = action.payload?.quantity;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateCart.rejected]: (state, action) => {
      state.message = action.payload;
      state.isSuccess = false;
    },
  },
});

export const { getCart, addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
