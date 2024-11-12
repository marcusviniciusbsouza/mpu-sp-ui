import React, { useEffect, useState } from 'react'
import './Input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const [value, setValue] = useState<string | number | readonly string[]>(props.value || ''); // Modificação na tipagem do estado

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (props.validation && props.value) {
            setError(!props.validation(String(props.value))); // Conversão para string
        }
    }, [props.validation, props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = event.target;
        setValue(inputValue);
        if (props.validation) {
            setError(!props.validation(inputValue));
        }
    };

    return (
        <div className='AppInput'>
            <label>
                <span>{props.label}</span>
                <input
                    {...props}
                />
            </label>
            {error && <div className="error">{props.errorMessage || 'Campo inválido'}</div>}
        </div>
    );
};

export default Input