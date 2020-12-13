import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { MemoField, getEmptyObject } from './FieldUtils';
import useRadioGroup from './useRadioGroup';

export default function MuiRadioGroup (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getRadioProps = getEmptyObject, form, fieldKeyPath, validation,
    radioOptions, validateOnChange = true
  } = props;

  const {
    fieldMetaData,
    value,
    handleChange,
    onRef,
    helperText
  } = useRadioGroup({
    form, fieldKeyPath, validation, radioOptions, validateOnChange
  });

  return (
    <>
      {radioOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          label={option.label}
          value={option.value}
          control={(
            <Radio checked={option.value === value} onChange={handleChange} {...getRadioProps({ value: value, option })} />
          )}
          ref={onRef}
          {...getFormControlLabelProps({ value: value, option })}
        />
      ))}
      {helperText}
    </>
  );
}

MuiRadioGroup.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getRadioProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  radioOptions: PropTypes.array
};

export function MemoMuiRadioGroup (props) {
  return (
    <MemoField
      Field={MuiRadioGroup}
      props={props}
    />
  );
}
