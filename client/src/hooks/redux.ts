/**
 * Redux hooks
 * Docs: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
import type { AppDispatch, RootState } from '@/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Typed useAppDispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useAppSelector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
