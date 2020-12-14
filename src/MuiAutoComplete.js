import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getHelperText, useIsMount, MemoField, getEmptyObject } from './FieldUtils';

export default function MuiAutoComplete (props) {
  const {
    getAutocompleteProps = getEmptyObject, getTextFieldProps = getEmptyObject,
    form, fieldKeyPath, validation,
    valueKey, validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const { multiple, options } = getAutocompleteProps({ value: value });

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event, selected) => {
    let value;
    if (valueKey) {
      if (multiple) {
        value = selected.map(option => _get(option, valueKey));
      } else {
        value = _get(selected, valueKey);
      }
    } else {
      value = selected;
    }
    form.setFieldValue(fieldKeyPath, value);
  };

  let selected;
  if (valueKey) {
    let emptyValue;
    if (multiple) {
      emptyValue = [];
    } else {
      emptyValue = '';
    }
    const _value = value || emptyValue;
    if (multiple) {
      selected = options.filter(option => {
        const optionValue = _get(option, valueKey);
        return _value.includes(optionValue);
      });
    } else {
      selected = options.find(option => {
        const optionValue = _get(option, valueKey);
        return _value === optionValue;
      });
    }
  } else {
    selected = value;
  }

  return (
    <>
      <Autocomplete
        fullWidth
        value={selected}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} {...getTextFieldProps({ value: value })} />}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
        {...getAutocompleteProps({ value: value })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

MuiAutoComplete.propTypes = {
  getAutocompleteProps: PropTypes.func,
  getTextFieldProps: PropTypes.func,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  validateOnChange: PropTypes.bool,
  valueKey: PropTypes.string
};

export function MemoMuiAutoComplete (props) {
  return (
    <MemoField
      Field={MuiAutoComplete}
      props={props}
    />
  );
}