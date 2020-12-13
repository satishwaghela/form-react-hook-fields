import React, { useRef, useEffect, useMemo } from 'react';
import { isEmpty as _isEmpty } from 'lodash';

export function useIsMount () {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export function getHelperText (fieldMetaData) {
  if (fieldMetaData.validating) {
    return <p className='form-helper validating'>Validating...</p>;
  } else if (fieldMetaData.error) {
    return <p error className='form-helper error'>{fieldMetaData.error}</p>;
  } else {
    return null;
  }
}

export function MemoField (memoProps) {
  const { Field, props } = memoProps;
  const { form, fieldKeyPath, memoDepArr = [] } = props;
  const value = form.getFieldValue(fieldKeyPath);
  const metaData = form.getFieldMetaData(fieldKeyPath);
  return useMemo(() => {
    return (
      <Field
        {...props}
      />
    );
    // eslint-disable-next-line
  }, [fieldKeyPath, value, _isEmpty(metaData) ? '' : metaData, ...memoDepArr]);
};

export function getEmptyObject () {
  return {};
}