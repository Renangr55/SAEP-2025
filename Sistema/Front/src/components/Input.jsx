export const Input = ({inputType,labelId,textLabel,idInput,register,widthInput, heightInput,bgInput}) => {
    return (
        <section className={`flex flex-col ${widthInput}`}>
            <label htmlFor={labelId}>{textLabel}</label>
            <input className={`${widthInput} ${heightInput} ${bgInput}`}
            type={inputType} 
            id={idInput}
            {...register}

/>
        </section>
    )
}