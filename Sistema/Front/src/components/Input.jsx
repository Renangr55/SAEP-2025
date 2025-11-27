// export const Input = () => {
//     return (
//         <section className={`flex flex-col ml-${marginLeft} gap-${gapInput}  mt-${marginTop} m-${margin} pl-${paddingleft} `}>
//         <label className={`text-${tamanhoLabel} font-${fonteLabel}`}>{label}</label>
//         {nome ? (
//             <input
//             {...register(nome, {
//                 onChange: (e) => {
//                 if (validacao) validacao(e.target.value);
//                 if (onChange) onChange(e);
//                 }
//                 })}
//                 className={`flex justify-center bg-[#E0E2E5] pl-3  w-${larguraInput} h-${alturaInput} border-b text-black pt-${paddingTop} pb-${paddingBottom} `}
//                 type={tipo}
//                 placeholder={placeholder}
//                 id={idCampo}
//                 defaultValue={valorInput}
//                 readOnly={inputLeitura}
//                 max={max}
//                 min={min}
//         </section>
//     )
// }