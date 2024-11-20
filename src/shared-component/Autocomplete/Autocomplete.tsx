import React, { useState, useEffect } from 'react';
import './Autocomplete.css';

// Definições de tipos para as opções
export interface Option {
  id: any;
  name: string;
}

interface AutocompleteProps {
  label: string;
  options: Option[];
  value?: any;
  onOptionSelect: (option: Option) => void;
  onInputChange?: (value: string, hasChanged: boolean) => void; // Altere para passar o valor e o status da mudança
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  options,
  value,
  onOptionSelect,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Valor do input
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options); // Opções filtradas
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle do dropdown
  const [initialValue, setInitialValue] = useState<string>(''); // Valor inicial

  // Atualiza o valor do input baseado no ID recebido como `value`
  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = options.find((option) => option.id === value);
      if (selectedOption) {
        setInputValue(selectedOption.name);
        setInitialValue(selectedOption.name); // Armazena o valor inicial
      }
    }
  }, [value, options]);

  // Atualiza as opções filtradas com base no valor do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      )
    );

    setIsDropdownVisible(value !== ''); // Mostra o dropdown se houver valor

    // Verifica se o valor foi alterado
    const hasChanged = value !== initialValue;

    // Notifica a mudança para o componente pai
    if (onInputChange) {
      onInputChange(value, hasChanged); // Envia o valor e o status da mudança
    }
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.name);
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
    if (relatedTarget && relatedTarget.tagName === 'LI') {
      return; // Não fecha o dropdown se for clicar em uma opção
    }
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
                {option.name}
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
