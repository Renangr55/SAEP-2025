import { Link } from "react-router-dom";

export const Button = ({ typeButton = "button", typeLink = "", onClickFuction,
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
        <button onClick={onClickFuction} type={typeButton} className={`${bgButton} ${heightButton} ${widhtButton} ${textColor} cursor-pointer`}>
            {children}
        </button>
    );
};

export default Button;
