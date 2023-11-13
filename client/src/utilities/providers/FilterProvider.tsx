/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer } from 'react';
import { FilterConsumerProp, FilterContext } from "../context/FilterContext";


const initialState: FilterConsumerProp = {
    setFilter: () => null,
    removeFilter: () => null,
    resetFilters: () => null,
    competitors: [],
    labels: [],
    month: [],
    sort: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterReducer = (state: FilterConsumerProp, action: { type: string, filterName?: string, filterValue?: any }) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                [action.filterName!]: [...state[action.filterName!], action.filterValue],
                };
        case 'REMOVE_FILTER': {
            const updatedFilter = state[action.filterName!].filter((value) => value !== action.filterValue);
            return {
                ...state,
                [action.filterName!]: updatedFilter,
              };
            
        }
        case 'RESET_FILTERS':
        return initialState;
        default:
        return state;
    }
  };

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
  
    const setFilter = (filterName: string, filterValue: any) => {
        console.log('setFilter', filterName, filterValue)
      dispatch({ type: 'SET_FILTER', filterName, filterValue });
    };

    const removeFilter = (filterName: string, filterValue: any) => {
      dispatch({ type: 'REMOVE_FILTER', filterName, filterValue });
    };
  
    const resetFilters = () => {
      dispatch({ type: 'RESET_FILTERS' });
    };
  
    return (
      <FilterContext.Provider value={{ ...state, setFilter, resetFilters, removeFilter }}>
        {children}
      </FilterContext.Provider>
    );
  };