import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./Slices/dataslice"

const store=configureStore({
    reducer:{
        categories:DataSlice
    }
}
)
export default store