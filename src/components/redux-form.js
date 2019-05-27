import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'


const group = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export const renderTextField = ({
    input,
    label,
    placeholder,
    name,
    id,
    type,
    meta: { touched, error },
    ...custom
  }) => (
   <div>
      <TextField
      // required
      id={id}
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      helperText={touched && error}
      {...input}
      {...custom}
    />
    {touched && error && <span style={{color:'red'}}>{error}</span>}
   </div>
  )

 export const renderCheckbox = ({ input, label }) => (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
          />
        }
        label={label}
      />
    </div>
  )

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

  export const MultipleSelect = ({ input, label, value, onChange }) => (
    <div>
      <FormControl >
          <InputLabel htmlFor="select-multiple">{label}</InputLabel>
          <Select
            multiple
            value={value}
            onChange={onChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {group.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
  )

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
}

export const renderSelectField = ({
    input,
    label,
    name,
    id,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <FormControl error={touched && error}>
     <InputLabel
        ref={ref => {
         // this.InputLabelRef = ref;
        }}
        htmlFor="outlined-age-native-simple"
      >
        {label}
      </InputLabel>
      {/* <InputLabel htmlFor="age-native-simple">{label}</InputLabel> */}
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name:{name},
          id :{id}
        }}
        input={
          <OutlinedInput
            name="age"
           // labelWidth={this.state.labelWidth}
            id="outlined-age-native-simple"
          />
        }
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )

export const radioButton = ({ input, ...rest }) => (
    <FormControl variant="outlined">
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  )
//   export const renderSelectField = ({
//     input,
//     label,
//     meta: { touched, error },
//     children,
//     ...custom
//   }) => (
//     <SelectField
//       floatingLabelText={label}
//       errorText={touched && error}
//       {...input}
//       onChange={(event, index, value) => input.onChange(value)}
//       children={children}
//       {...custom}
//     />
//   )
  