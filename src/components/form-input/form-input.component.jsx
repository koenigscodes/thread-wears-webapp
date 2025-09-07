import './form-input.style.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      { label && (
        <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
      )
      }
    </div>
  );
};

export default FormInput;

// const FormInput = ({ label, inputOptions }) => {
//   return (
//     <div className="group">
//       <input className="form-input" {...inputOptions} />
//       { label && (
//         <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
//       )
//       }
//     </div>
//   );
// };

// export default FormInput;