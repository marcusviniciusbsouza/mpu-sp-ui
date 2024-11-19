import React, { useState } from 'react';
import './Autocomplete.css';

interface Option {
  id: number;
  nome: string;
}

interface AutocompleteProps {
  label: string;
  options: Option[];
  onOptionSelect: (option: Option) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ label, options, onOptionSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    setFilteredOptions(
      options.filter((option) =>
        option.nome.toLowerCase().includes(value.toLowerCase())
      )
    );

    setIsDropdownVisible(value !== '');
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.nome);
    setIsDropdownVisible(false);
    onOptionSelect(option);
  };

  const handleInputFocus = () => {
    if (inputValue !== '') {
      setIsDropdownVisible(true); 
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;

    // Verifica se o clique foi em uma opção da lista
    if (relatedTarget && relatedTarget.tagName === 'LI') {
      return; // Não fecha o dropdown
    }

    // Fecha o dropdown ao perder o foco fora da lista
    setIsDropdownVisible(false);
  };

  return (
    <div className="AppAutocomplete">
      <label>
        <span>{label}</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Digite para buscar..."
        />
      </label>
      {isDropdownVisible && (
        <ul className="options-list" tabIndex={-1}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                tabIndex={0}
              >
                {option.nome}
              </li>
            ))
          ) : (
            <li>Nenhuma opção encontrada</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;