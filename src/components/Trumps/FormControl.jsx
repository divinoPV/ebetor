import Checkbox from '../Molecules/Controls/Checkbox/Checkbox';
import Date from '../Molecules/Controls/Date/Date';
import Input from '../Molecules/Controls/Input/Input';
import Radio from '../Molecules/Controls/Radio/Radio';
import Select from '../Molecules/Controls/Select/Select';

const FormControl = ({ control, ...rest }) => ({
  'input': <Input {...rest} />,
  'textarea': <Input control="textarea" {...rest} />,
  'select': <Select control={control} {...rest} />,
  'radio': <Radio control={control} {...rest} />,
  'checkbox': <Checkbox control={control} {...rest} />,
  'date': <Date control={control} {...rest} />,
  'default': null
}[control]);

export default FormControl;
