import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Property {
  id: number;
  name: string;
  availability: string;
  seen: string;
  rating: number;
  wishlisted: boolean;
  slides: any[];
}

interface PropertyState {
  properties: Property[];
}

const initialState: PropertyState = {
  properties: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties(state, action: PayloadAction<Property[]>) {
      state.properties = action.payload;
    },
    toggleWishlist(state, action: PayloadAction<number>) {
      const property = state.properties.find((p) => p.id === action.payload);
      if (property) {
        property.wishlisted = !property.wishlisted;
      }
    },
  },
});

export const { setProperties, toggleWishlist } = propertySlice.actions;
export default propertySlice.reducer;
