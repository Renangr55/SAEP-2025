import { Link } from "react-router-dom";

export const Button = ({ typeButton = "button", typeLink = "", 
    children,
    bgButton,
    heightButton, 
    widhtButton,
    textColor
}) => {
    if (typeLink) {
        return (
            <Link to={typeLink}>
                <button type={typeButton}>
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button type={typeButton} className={`${bgButton} ${heightButton} ${widhtButton} ${textColor} cursor-pointer`}>
            {children}
        </button>
    );
};

export default Button;
