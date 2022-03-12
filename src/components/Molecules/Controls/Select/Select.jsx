import Option from '../../../Atoms/Form/Controls/Option/Option';
import ErrorMessage from '../../../Atoms/Form/ErrorMessage/ErrorMessage';
import Field from '../../../Atoms/Form/Field/Field';

const Select = ({ label, name, options, ...rest }) => <div>
  <label>
    {label}
    <Field as="select" name={name} {...rest}>
      <Option value="">Aucun</Option>
      {options.map(option => <Option key={option.id} value={option.slug}>{option.name}</Option>)}
    </Field>
  </label>
  <ErrorMessage name={name} />
</div>;

export default Select;
