import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { MemoField, getEmptyObject } from './FieldUtils';
import useCheckbox from './useCheckbox';

export default function MuiCheckbox (props) {
  const {
    getFormControlLabelProps = getEmptyObject, getCheckboxProps = getEmptyObject, form, fieldKeyPath, validation,
    controlType = 'checkbox', validateOnChange = true
  } = props;

  const {
    value,
    handleChange,
    onRef,
    helperText
  } = useCheckbox({
    form, fieldKeyPath, validation, validateOnChange
  })

  let ControlComp;
  if (controlType === 'switch') {
    ControlComp = Switch;
  } else {
    ControlComp = Checkbox;
  }

  return (
    <>
      <FormControlLabel
        control={(
          <ControlComp
            checked={value}
            onChange={handleChange}
            ref={onRef}
            {...getCheckboxProps({ value: value })}
          />
        )}
        {...getFormControlLabelProps({ value: value })}
      />
      {helperText}
    </>
  );
}

MuiCheckbox.propTypes = {
  getFormControlLabelProps: PropTypes.func,
  getCheckboxProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  controlType: PropTypes.string
};

export function MemoMuiCheckbox (props) {
  return (
    <MemoField
      Field={MuiCheckbox}
      props={props}
    />
  );
}
