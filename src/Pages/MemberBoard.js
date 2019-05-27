import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBarComponent from '../components/AppBar'
import DrawerComponent from '../components/Drawer'
import Table from '../components/table'
import Paper from '../components/paper'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {getBackLog, getMember, deleteMember} from '../redux/actions/memberActions'
import classNames from 'classnames';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
 menuButton: {
    marginLeft: 12,
    marginRight: 36,
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
  },
});

class MemberBoard extends React.Component {

  componentDidMount(){
    const {member_id} = this.props.match.params
    this.props.getBackLog();
    this.props.getMember(member_id);
    console.log(member_id)
  }
 
  render() {
    const { classes, theme, members, deleteMember, getMember, member } = this.props;
    const {member_id} = this.props.match.params
    console.log(this.props.members)
    console.log(this.props.member)

    return (
      <div >
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Table
             _data={members} 
             deleteMember={deleteMember} 
             getMember={getMember} 
             member={member}
             member_id={member_id}
          />
        </main>
      </div>
    );
  }
}

MemberBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  getBackLog:PropTypes.func.isRequired,
  getMember:PropTypes.func.isRequired,
  members:PropTypes.object.isRequired,
  member:PropTypes.object.isRequired,
  error:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  members:state.member,
  member:state.member,
  errors:state.error
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getBackLog, getMember, deleteMember }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(
  styles, { withTheme: true
   })(MemberBoard));

