import ErrorMessage from '../../../Atoms/Form/ErrorMessage/ErrorMessage';
import Field from '../../../Atoms/Form/Field/Field';

const Input = ({ control, label, name, ...rest }) => <div>
  <label>
    {label}
    <Field as={control} name={name} {...rest} />
  </label>
  <ErrorMessage name={name} />
</div>;

export default Input;
