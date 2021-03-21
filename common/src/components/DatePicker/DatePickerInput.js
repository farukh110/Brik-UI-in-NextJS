import React, { useCallback } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';
import frLocale from 'date-fns/locale/fr';
import enLocale from 'date-fns/locale/en-US';

const localeMap = {
  en: enLocale,
  fr: frLocale
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    padding: 0,
    borderRadius: 7,
    backgroundColor: 'white',
    border: '1px solid #D8D8D8',
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '&.Mui-focused': {
      borderRadius: 7,
      borderColor: '#80bdff',
      backgroundColor: 'white'
    },
    marginRight: '20px'
  },
  input: {
    fontSize: '17px',
    lineHeight: '20px',
    padding: '12px 20px'
  },
  inputAdornmentRoot: {
    position: 'absolute',
    right: '0'
  },
  inputLabelRoot: {
    color: '#777F90',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '14px',
    '&.Mui-disabled': {
      color: '#777F90'
    }
  },
  formLabelFocused: {}
}));

const DatePickerInput = ({ onChange: onChangeProps, ...props }) => {
  const onChange = useCallback(
    (date) => {
      onChangeProps(date);
    },
    [onChangeProps]
  );

  const classes = useStyles();
  const locale = 'fr';

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale] || localeMap['fr']}>
      <KeyboardDatePicker
        margin="normal"
        format="dd/MM/yyyy"
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.inputLabelRoot,
            focused: classes.formLabelFocused
          }
        }}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputRoot,
            input: classes.input
          }
        }}
        autoOk
        value={props.value || null}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerInput;
