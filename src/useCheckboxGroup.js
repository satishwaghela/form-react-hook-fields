import { useEffect } from 'react';

export default function useCheckboxGroup (props) {
  const {
    form, fieldKeyPath, validation, checkboxOptions = [], validateOnChange = true
  } = props;

  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, []);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.length]);

  const handleChange = (event) => {
    const newValue = [...value];
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      newValue.push(name);
    } else {
      const index = value.indexOf(name);
      newValue.splice(index, 1);
    }
    form.setFieldValue(fieldKeyPath, newValue);
  };
  
  return {
    fieldMetaData,
    value,
    handleChange,
    onRef: (ref) => {
      const formRef = form.registerField(fieldKeyPath, {
        validation: validation
      });
      formRef.current = ref;
    },
    helperText: getHelperText(fieldMetaData)
  };
}
