import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {viewMember} from '../redux/actions/memberActions'
import {deleteMember} from '../redux/actions/memberActions'

import EnhancedTableSearchToolbar from './EnhancedTableSearchToolbar'

let counter = 0;
function createData(id,fname, lname, gender, age, mname) {
  counter += 1;
  return {id, fname, lname, gender, age, mname };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'operation', numeric: false, disablePadding: true, label: '' },
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
  { id: 'age', numeric: false, disablePadding: true, label: 'Age' },
  { id: 'middleName', numeric: false, disablePadding: true, label: 'Middle' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  
});


let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Members
        </Typography>
        {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : null
        }
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          <Link to="/addMember">
            <Button variant="contained" color="primary" className={classes.button}>
             New
            </Button>
          </Link>
      </div>
      <div className={classes.actions}>
          <Link to="/addMember">
            <Button variant="contained" color="secondary" className={classes.button}>
             Actions
            </Button>
          </Link>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    selectedId: 0
  };

  // componentWillReceiveProps(nextProps){
  //   nextProps._data.members.map((items) => {
  //       this.state.data.push(createData(items.id, items.firstName, items.lastName, items.gender, items.age, items.middleName))
  //   })
  // }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState({ selected: this.props._data.members.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    console.log(selectedIndex)
    console.log(id)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    console.log(newSelected)

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  selectedMemberId = id => this.setState({selectedId : id})

  onDeleteClick = member_id => {
    console.log(member_id)
    console.log(this.state.selectedId)
    this.props.deleteMember(this.state.selectedId);
  }

  onGetClick = member_id => {
    //console.log(member_id)
   this.props.getMember(member_id)
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  render() {
    console.log(this.props._data.members)
    const { classes } = this.props;
    console.log(this.props)
    const { data, order, orderBy, selected, rowsPerPage, page, anchorEl, open } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props._data.members.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Divider/>
        <EnhancedTableSearchToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props._data.members.length}
            />
            <TableBody>
              {stableSort(this.props._data.members, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  //console.log("The n Value:" + JSON.stringify(n))
                  console.log(isSelected)
                  return (
                    <TableRow
                      hover
                      //onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      //aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      //selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)}/>
                      </TableCell>
                      <TableCell padding="none" scope="row">
                        <Button
                          buttonRef={node => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? 'menu-list-grow' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleToggle}
                        >
                          <ArrowDropDown onClick={() => this.selectedMemberId(n.id)}/>
                        </Button>
                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                <Link to={`member/edit/${this.props.member_id}`} ><MenuItem onClick={() => {this.onGetClick(n.id)}}>Edit</MenuItem></Link>
                                <Link to="/profile"><MenuItem onClick={this.handleClose}>View</MenuItem></Link>
                                <MenuItem checked={isSelected} onClick={() => this.onDeleteClick(n.id)}>Delete</MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                      </TableCell>
                      <TableCell  component="th" scope="row" padding="none">{n.firstName}</TableCell>
                      <TableCell  component="th" scope="row" padding="none">{n.lastName}</TableCell>
                      <TableCell  component="th" scope="row" padding="none">{n.gender}</TableCell>
                      <TableCell  component="th" scope="row" padding="none">{n.age}</TableCell>
                      <TableCell  component="th" scope="row" padding="none">{n.middleName}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props._data.members.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
 // deleteMember:PropTypes.func.isRequired
};

//export default withStyles(styles)(EnhancedTable);
export default (withStyles(
  styles)(EnhancedTable));

