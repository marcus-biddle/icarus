import React, { useRef, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { Show } from '../../helpers/functional';
import './PillFilter.css';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { useFilterContext } from '../../utilities/hooks/useFilterContext';

interface PillFilterProps {
    filterName: string;
    options: string[];
    filterData: string[] | string | undefined;
    singleValue: boolean;
}

const PillFilter = ({ filterName, options, filterData, singleValue }: PillFilterProps) => {
    const { setFilter, removeFilter } = useFilterContext();
    const [thisfilterOpen, setThisFilterOpen] = useState(false);

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setThisFilterOpen(false));

    const handleCompetitorChange = (option: string) => {
        if (filterData?.includes(option)) {
            removeFilter(filterName, option);
        } else if (singleValue && filterData?.length === 0) {
            setFilter(filterName, option);
        } else if (singleValue === false) {
            setFilter(filterName, option);
        }
      };

  return ( 
    // #343c46
    <div style={{ position: 'relative', padding: '0 8px'}}>
        <button onClick={() => setThisFilterOpen(true)} className='button-container'>
                <span className='button-text'>{filterName}</span>
                <CiPlay1 style={{ backgroundColor: 'transparent', color: 'white', transform: 'rotate(90deg)', height: '13px', width: '13px'}}/>
        </button>

        <Show when={thisfilterOpen}>
            <div className="filter-popup" ref={wrapperRef}>
                {options.map((option, index) => (
                    <label key={`${option}-${index}`}>
                        <input
                            name={option}
                            type='checkbox'
                            checked={filterData?.includes(option)}
                            onChange={() => handleCompetitorChange(option)}
                        />
                        {option}
                    </label> 
                ))}
            </div>
        </Show>
    </div>
  )
}

export default PillFilter