import React, { useRef, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { Show } from '../../helpers/functional';
import './PillFilter.css';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick'

const PillFilter = ({ filterName }) => {
    const [thisfilterOpen, setThisFilterOpen] = useState(false);

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setThisFilterOpen(false));

  return (
    <div style={{ position: 'relative', padding: '0 8px'}}>
        <button 
            onClick={() => setThisFilterOpen(true)}
            style={{ display: 'flex', backgroundColor: 'transparent', alignItems: 'baseline', padding: '8px'}}>
                <span style={{ fontSize: '14px', paddingRight: '4px', color: 'white'}}>{filterName}</span>
                <CiPlay1 style={{ backgroundColor: 'transparent', color: 'white', transform: 'rotate(90deg)', height: '13px', width: '13px'}}/>
        </button>

        <Show when={thisfilterOpen}>
            <div className="filter-popup" ref={wrapperRef}>
                <input 
                name='Test'
                type='checkbox'
                onChange={() => console.log('checkbox clicked.')}
                 />
                Test
            </div>
        </Show>
    </div>
  )
}

export default PillFilter