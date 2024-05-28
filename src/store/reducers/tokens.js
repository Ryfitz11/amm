import { createSlice } from '@reduxjs/toolkit';

export const tokens = createSlice({
  name: 'tokens',
  initialState: {
    contracts: [],
    symbol: [],
    balances: [0, 0]
  },
  reducers: {
    setContracts: (state, action) => {
      state.contracts = action.payload
    },
    setSymbols: (state, action) => {
      state.symbol = action.payload
    },
    balancesLoaded: (state, action) => {
      state.balances = action.payload
    }
  }
})

export const { setContracts, setSymbols, balancesLoaded } = tokens.actions;

export default tokens.reducer;