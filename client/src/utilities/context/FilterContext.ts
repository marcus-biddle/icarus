/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export interface FilterConsumerProp {
    setFilter: (filterName: any, filterValue: any) => void;
    removeFilter: (filterName: any, filterValue: any) => void;
    resetFilters: () => void; 
    competitors?: string[]; 
    labels?: string[]; 
    month?: string[]; 
    sort?: string[];
}

export const FilterContext = createContext<FilterConsumerProp>({
    setFilter: () => null,
    removeFilter: () => null,
    resetFilters: () => null,
    competitors: [],
    labels: [],
    month: [],
    sort: [],
});