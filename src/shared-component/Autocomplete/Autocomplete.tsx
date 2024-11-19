import React, { useEffect, useState } from 'react';
import './Autocomplete.css';

interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    options: string[];
    onOptionSelect?: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ label, options, onOptionSelect, ...props }) => {
    const [value, setValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (value) {
            const filtered = options.filter(option => 
                option.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setIsOptionsVisible(filtered.length > 0);
        } else {
            setFilteredOptions([]);
            setIsOptionsVisible(false);
        }
    }, [value, options]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleOptionClick = (option: string) => {
        setValue(option);
        setIsOptionsVisible(false);
        if (onOptionSelect) { 
            onOptionSelect(option);
        }
    };

    return (
        <div className='AppAutocomplete'>
            {label && (
                <label>
                    <span>{label}</span>
                    <input
                        {...props}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsOptionsVisible(true)}
                    />
                </label>
            )}
            {isOptionsVisible && (
                <ul className='options-list'>
                    {filteredOptions.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;