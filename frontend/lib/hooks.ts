import { useStore as originalUseStore } from 'react-redux';  

// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();

export const useAppDispatch = () => useDispatch<AppDispatch>();  
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => originalUseStore<AppStore>();  

