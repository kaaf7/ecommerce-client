/* * 👇
 *This is apiCalls for login and registeration requests
 */

// import reducers from user Slice
import {
  registerStart,
  registerFailed,
  registerSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
} from "./userRedux";
// import public and private axios requests from services
import { publicRequest, privateRequest } from "../services";
// import getFavorite reducer from favorite slice
import { getFavorite } from "../redux/favoriteRedux";
// import getCart reducer from cart slice
import { getCart } from "./cartRedux";

// export login async login function with dispatch and user argument to call in Login page
export const login = async (dispatch, user) => {
  // unwrapData function to get all the data like cart and favoite once the user logged in
  const unWrapData = async (userId, userToken) => {
    const favorites = await privateRequest.get(
      `favorite/findfavorite?id=${userId}`,
      { headers: { token: `${userToken}` } }
    );
    const cart = await privateRequest.get(`/cart/find?id=${userId}`, {
      headers: { token: `${userToken}` },
    });
    dispatch(getFavorite(favorites.data));
    dispatch(getCart(cart.data));
    window.location.reload();
  };

  // dispatch loginStart reducer
  dispatch(loginStart());
  try {
    // wait for response
    const res = await publicRequest.post("auth/login", user);
    // if we get response
    if (res) {
      // get accessToken and userId from respone data
      const userToken = res.data.accessToken;
      const userId = res.data._id;
      // dispatch loginSuccess reducer
      dispatch(loginSuccess(res.data));
      // then call unWrapData function
      try {
        unWrapData(userId, userToken);
      } catch (err) {
        console.log("data error");
      }
    }
  } catch (err) {
    // if login failed dispatch loginFailed reducer
    dispatch(loginFailed());
    console.log(err.response.data);
  }
};
// export register async function with dispatch and user argument to call in register page
export const register = async (dispatch, user) => {
  // dispatch registerstart reducer
  dispatch(registerStart());
  try {
    // wait for public request response
    const res = await publicRequest.post("auth/register", user);
    // if response was successful then dispatch registerSuccess
    res && dispatch(registerSuccess());
  } catch (err) {
    // in case of error dispatch registerFailed reducer
    dispatch(registerFailed());
  }
};
