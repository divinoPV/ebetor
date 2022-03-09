import Checkbox from '../Molecules/Controls/Checkbox/Checkbox';
import Date from '../Molecules/Controls/Date/Date';
import Input from '../Molecules/Controls/Input/Input';
import Radio from '../Molecules/Controls/Radio/Radio';
import Select from '../Molecules/Controls/Select/Select';

const FormControl = ({ control, ...rest }) => ({
  'input': <Input {...rest} />,
  'textarea': <Input control="textarea" {...rest} />,
  'select': <Select {...rest} />,
  'radio': <Radio {...rest} />,
  'checkbox': <Checkbox {...rest} />,
  'date': <Date {...rest} />,
  'default': null
}[control]);

export default FormControl;
