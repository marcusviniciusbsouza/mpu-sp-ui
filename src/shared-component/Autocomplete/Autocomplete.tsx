import React, { useState, useEffect } from 'react';
import './Autocomplete.css';

// Define a interface para as opções
export interface Option {
  id: any; // Pode ajustar o tipo caso tenha certeza do tipo do ID
  name: string;
}

// Propriedades aceitas pelo componente Autocomplete
interface AutocompleteProps {
  label: string; // Rótulo do input
  options: Option[]; // Lista de opções para o autocomplete
  onOptionSelect: (option: Option) => void; // Função chamada ao selecionar uma opção
  value?: any; // ID da opção selecionada
  onChange?: (value: string) => void; // Função opcional para notificar mudanças no input
}

const Autocomplete: React.FC<AutocompleteProps> = ({ 
  label, 
  options, 
  onOptionSelect, 
  value, 
  onChange 
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Valor do input
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options); // Opções filtradas
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle do dropdown

  // Atualiza o valor do input baseado no ID recebido como `value`
  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = options.find(option => option.id === value);
      if (selectedOption) {
        setInputValue(selectedOption.name); // Atualiza o input com o nome correspondente
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

    if (onChange) {
      onChange(value); // Notifica mudanças no input
    }
  };

  // Trata a seleção de uma opção
  const handleOptionClick = (option: Option) => {
    setInputValue(option.name); // Define o nome da opção no input
    setIsDropdownVisible(false); // Fecha o dropdown
    onOptionSelect(option); // Notifica a seleção da opção
  };

  // Mostra o dropdown ao focar no input
  const handleInputFocus = () => {
    if (inputValue !== '') {
      setIsDropdownVisible(true);
    }
  };

  // Esconde o dropdown ao perder o foco, exceto se clicar em uma opção
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
