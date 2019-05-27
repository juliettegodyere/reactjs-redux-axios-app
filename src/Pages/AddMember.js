import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';

import AppBarComponent from '../components/AppBar'
import DrawerComponent from '../components/Drawer'
import CustomTextInput from '../components/textInput'
import {renderTextField, renderCheckbox, radioButton, renderSelectField, MultipleSelect } from '../components/redux-form'

import {connect} from 'react-redux'
import {addMember} from '../redux/actions/memberActions'

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor:'white'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
 menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    //height: '100vh',
    //overflow: 'auto',
    backgroundColor:'white'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  errors:{
    color:"red"
  }
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'first_name',
    'last_ame',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class AddMemberBoard extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      firstName: "",
      lastName: "",
      middleName: "",
      title: "",
      errors:"",
      labelWidth:0
    };
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
  //   });
  // }

  handleChange = (event) => {
    //console.log([event.target.name] + ":" + event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      // title: this.state.title,
    }
    console.log(newMember);
    console.log(this.props)
    this.props.addMember(newMember, this.props.history)
  };

  render() {
    console.log(this.props)
    const { classes, theme } = this.props;
    const {errors} = this.state;
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
        <main className={classes.content}>
           <div className={classes.toolbar} />
           <Typography variant="h4" gutterBottom component="h2">
             Create Member
          </Typography>
          <Typography variant="h6" gutterBottom component="h2">
            indicates a required field
          </Typography>
          <form  onSubmit={handleSubmit} onSubmit={this.onSubmit}>
            <Typography variant="h4" gutterBottom component="h2">Personal Details</Typography>
            <div>
              <Field
                id="outlined-full-width"
                name="passport"
                component={renderTextField}
                //label="Passport"
                type="file"
              />
            </div><br/>
            <div>
                <Field
                  id="outlined-full-width"
                  name="first_name"
                  component={renderTextField}
                  label="First Name"
                  type="text"
                />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="last_name"
                component={renderTextField}
                label="Last Name"
                type="text"
              />
            </div><br/>
            <div>
              <Field
                  id="outlined-full-width"
                  name="middle_name"
                  component={renderTextField}
                  label="Middle Name"
                  type="text"
              />
            </div><br/>
            <div>
              <Field name="sex" component={radioButton}>
                <Radio value="male" label="male" />
                <Radio value="female" label="female" />
              </Field>
            </div>
            <div>
              <Field
                  id="date"
                  name="dob"
                  component={renderTextField}
                  label="Date of Birth"
                  type="date"
                  defaultValue="2017-05-24"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="status"
                component={renderSelectField}
                label="Marital Status"
                type="select"
                fullWidth
                // labelWidth={this.state.labelWidth}
              >
                <option value="" />
                <option value={'married'}>Married</option>
                <option value={'single'}>Single</option>
                <option value={'widow'}>Widow</option>
              </Field>
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="zone"
                component={renderSelectField}
                label="Zone"
                type="select"
              >
               <option value="" />
                <option value={'HOG'}>House of Grace</option>
                <option value={'PH'}>Portal's House</option>
                <option value={'HOC'}>House of Courage</option>
              </Field>
            </div><br/>
            <Typography variant="h4" gutterBottom component="h2">Contact Details</Typography>
            <div>
              <Field
                id="outlined-full-width"
                name="phone_number"
                component={renderTextField}
                label="Phone Number"
                type="number"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="address"
                component={renderTextField}
                label="Residential Address"
                type="text"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="email"
                component={renderTextField}
                label="Email Address"
                type="email"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="state"
                component={renderSelectField}
                label="State of Origin"
                type="select"
              >
               <option value="" />
                <option value={'married'}>Abia</option>
                <option value={'single'}>Adamawa</option>
                <option value={'widow'}>Akwa-ibom</option>
              </Field>
            </div><br/>
            <Typography variant="h4" gutterBottom component="h2">Employment History</Typography>
            <div>
              <Field
                id="outlined-full-width"
                name="employment_type"
                component={renderSelectField}
                label=" Type of Employement"
                type="select"
              >
               <option value="" />
                <option value={'self'}>Self Employed</option>
                <option value={'private'}>Private</option>
                <option value={'state'}>State</option>
                <option value={'fedral'}>Federal</option>
              </Field>
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="employer"
                component={renderTextField}
                label="Employer Name"
                type="text"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="employer.address"
                component={renderTextField}
                label="Office Address"
                type="text"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="email"
                component={renderTextField}
                label="Email Address"
                type="email"
              />
            </div><br/>
            <div>
              <Field
                id="outlined-full-width"
                name="employer.state"
                component={renderSelectField}
                label="Employement State"
                type="select"
              >
               <option value="" />
                <option value={'married'}>Abia</option>
                <option value={'single'}>Adamawa</option>
                <option value={'widow'}>Akwa-ibom</option>
              </Field>
            </div><br/>
          </form>
        </main>
    );
  }
}

AddMemberBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors:state.errors
})

// export default connect(mapStateToProps, {addMember})(withStyles(
//   styles, { withTheme: true
//    })(AddMemberBoard));

export default connect(mapStateToProps, {addMember})(reduxForm({
  form: 'MaterialUiForm',
  validate // a unique identifier for this form
})(withStyles(styles, {withTheme: true})
(AddMemberBoard)))
