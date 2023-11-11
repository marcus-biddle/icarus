import { useContext } from "react";
import { FilterConsumerProp, FilterContext } from "../context/FilterContext";

export const useFilterContext = () => {
    const context = useContext<FilterConsumerProp>(FilterContext);
    if (!context) {
        throw new Error('useFilterContext must be used within a FilterProvider');
    }
    
    return context;
}