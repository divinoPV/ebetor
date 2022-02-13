import { Field as FormikField } from 'formik';

const Field = ({ control, name, ...rest }) => <FormikField as={control} id={name} name={name} {...rest} />;

export default Field;
