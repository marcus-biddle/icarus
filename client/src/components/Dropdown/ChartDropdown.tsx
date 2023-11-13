import React, { Dispatch, SetStateAction, useState } from 'react';
import './ChartDropdown.css'
import { getCurrentMonth, getCurrentMonthSundays, getMonthsInCurrentYear } from '../../helpers/date';

interface DropdownOption {
  value: string;
  label: string;
}

const options: DropdownOption[] = [
    { value: 'year', label: 'Year' },
    { value: 'day', label: 'Day' },
    // { value: 'week', label: 'Week' },
    
];

export const DropdownMenu= ({ getDropdownOption }: { getDropdownOption: Dispatch<SetStateAction<string[]>>}) => {
  const [selectedOption, setSelectedOption] = useState<string>('month');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    const option = [{ 
        // 'week': getCurrentMonthSundays(),
        'year': getMonthsInCurrentYear(),
        'day': [`${getCurrentMonth()} ${new Date().getDate()}`] 
    }]
    getDropdownOption(option[0][event.target.value]);
  };

  return (
    <div style={{ textAlign: 'right'}}>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
