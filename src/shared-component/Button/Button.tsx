import React from "react";
import './Button.css'

declare interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement>{
    content?: string
    className?:string
    onClick?: () => void
    value?: string
    appendIcon?: any
    color?: any
    children?: React.ReactNode;
    icon?: any;
}

const Button: React.FC<ButtonProps> = (props) => {

    return (
        <button
            className={`AppButton 
                        ${props.color === 'grey' ? 'AppButtonGrey' : ''} 
                        ${props.color === 'danger' ? 'AppButtonDanger' : ''} 
                        ${props.color === undefined ? 'AppButtonPrimary' : ''}`}
            onClick={props.onClick}
        >
            {props.children || 'Nameless button'}
            {props.appendIcon}
        </button>
    );

}

export default Button