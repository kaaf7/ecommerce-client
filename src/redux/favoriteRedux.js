/* *
 *This is favorite slice
 *Created with redux toolkit
 *it is responsible for updating favorites list products and quantity
 */
// import createSlice and asyncThunk functions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import private requests and current user if exists
import { privateRequest, currentUser } from "../services";

/* updateFavorites createAsyncThunk function 
which is responsible for updating favorites products and quantity
with action payload as a new favorites whenever product is added or removed */
export const updateFavorite = createAsyncThunk(
  "favorite/updateFavorite",
  async (favorite, { rejectWithValue }) => {
    const url = `favorite/updatefavorite?id=${currentUser._id}`;
    try {
      const res = await privateRequest.put(url, favorite);
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
      state.quantity = favoritesArray.quantity;
    },
    //addAndRemoveFavorite reducer is responsible for adding and removing favorites
    addAndRemoveFavorite: (state, action) => {
      /* addTrigger a function that works a as toggle to
       trigger the useEffect in navbar when favorite is added*/
      const addTrigger = () => {
        if (state.favoriteAdded) {
          return false;
        } else {
          return true;
        }
      };
      /* removeTrigger a function that works a as toggle to
       trigger the useEffect in navbar when favorite is removed*/
      const removeTrigger = () => {
        if (state.favoriteRemoved) {
          return false;
        } else {
          return true;
        }
      };

      // check if favorites does not exist in favorites array,
      const doesFavoritExist =
        state.favorites.findIndex(
          (favorite) => favorite._id === action.payload._id
        ) !== -1;
      // if it does not exist then add it but if it exists then remove it
      if (!doesFavoritExist) {
        state.favorites.push(action.payload);
        // state.quantity += 1;
        state.favoriteAdded = addTrigger();
        state.favoriteRemoved = removeTrigger();
      } else {
        let updatedFavorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload._id
        );
        state.favorites = updatedFavorites;
        state.quantity -= 1;
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
      state.favorites = action.payload.favorites;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateFavorite.rejected]: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});
export const { addAndRemoveFavorite, getFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
