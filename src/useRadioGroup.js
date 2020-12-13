import { useEffect } from 'react';

export default function useRadioGroup (props) {
  const {
    form, fieldKeyPath, validation, radioOptions, validateOnChange = true
  } = props;

  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.value;
    form.setFieldValue(fieldKeyPath, value);
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
