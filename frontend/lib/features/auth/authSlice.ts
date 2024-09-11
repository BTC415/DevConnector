import { createAppSlice } from "@/lib/createAppSlice";
import { registerUser, loginUser } from "./authActions";

export interface AuthSliceState {
  loading: boolean,
  userInfo: null | {
    name: string,
    email: string,
    password: string
  },
  userToken: string | null,
  error: any,
  isAuthenticated: boolean
}

const initialState: AuthSliceState = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  isAuthenticated: false, // for monitoring the registration process.
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    logoutUser: create.reducer((state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAuthenticated = false;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Assuming user data is in action.payload.user  
        state.userToken = action.payload.token; // Assuming token is in action.payload.token  
        state.isAuthenticated = true; // Set authenticated to true on successful registration  
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // Ensure authenticated is false on error  
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Adjust based on your response structure  
        state.userToken = action.payload.token; // Adjust based on your response structure  
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function.
export const { logoutUser } = authSlice.actions;
