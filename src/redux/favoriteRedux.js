/* *
 *This is favorite slice
 *Created with redux toolkit
 *it is responsible for updating favorites list products and quantity
 */

// import createSlice and asyncthunk functions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import private requests and current user if exists
import { privateRequest, currentUser } from "../services";
// get current user Id if it exists
const userId = currentUser?._id;

/* updateFavorites createAsyncThunk function 
which is responsible for updating favorites products and quantity
with action payload as a new favorites whenever product is added or removed */
export const updateFavorite = createAsyncThunk(
  "favorite/updateFavorite",
  async (favorite, { rejectWithValue }) => {
    try {
      const res = await privateRequest.put(
        `favorite/updatefavorite?id=${userId}`,
        favorite
      );
      const updatedFavorites = res.data;
      return updatedFavorites;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
    quantity: 0,
    isSuccess: false,
    favoriteAdded: false,
    favoriteRemoved: false,
    fetchFavorite: true,
  },
  reducers: {
    getFavorite: (state, action) => {
      // get favorites with spread operator
      let favoritesArray = [...action.payload.favorites];
      // set state favorites as favoritesArray
      state.favorites = favoritesArray;
      // set state quantity as favoritesArray's quantity
      // state.quantity = favoritesArray.quantity;
    },
    //addAndRemoveFavorite reducer is responsible for adding and removing favorites
    addAndRemoveFavorite: (state, action) => {
      // check if favorites does not exist in favorites array,

      const doesFavoritExist =
        state.favorites.findIndex(
          (favorite) => favorite._id === action.payload._id
        ) !== -1;
      //if it does not exist then add it but if it exists then remove it
      if (!doesFavoritExist) {
        state.favorites.push(action.payload);
       // state.quantity += 1;
        state.favoriteAdded = true;
        state.favoriteRemoved = false;
      } else {
        let updatedFavorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload._id
        );
        state.favorites = updatedFavorites;
        //state.quantity -= 1;
        state.favoriteAdded = false;
        state.favoriteRemoved = true;
      }
    },
  },

  /* update cart extra reducer to updateFavorites which is an createAsyncThunk function it 
  will update Favorites on DB with every change happens either favorite is added or removed*/
  extraReducers: {
    [updateFavorite.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateFavorite.fulfilled]: (state, action) => {
     // state.quantity = action.payload.quantity;
      state.favorites = action.payload.favorites;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateFavorite.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isSuccess = false;
    },
  },
});
export const { addAndRemoveFavorite, getFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
