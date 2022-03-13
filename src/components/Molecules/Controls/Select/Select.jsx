import Option from '../../../Atoms/Form/Controls/Option/Option';
import ErrorMessage from '../../../Atoms/Form/ErrorMessage/ErrorMessage';
import Field from '../../../Atoms/Form/Field/Field';

const Select = ({ label, name, options, labelClassName, ...rest }) => <div>
  <label className={`${labelClassName ?? ''}`}>
    {label}
    <Field as="select" name={name} {...rest}>
      <Option value="">Tout</Option>
      {options.map(option => <Option key={option.id} value={option.slug}>{option.name}</Option>)}
    </Field>
  </label>
  <ErrorMessage name={name} />
</div>;

export default Select;
