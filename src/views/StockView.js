import React, { Component } from 'react';
import logo from './logo.svg';
import './StockView.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 24,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class StockView extends Component {
  constructor() {
    super();
    this.state = {
      operations: [],
      js: [],
    }
  }

  componentDidMount() {
    const axios = require('axios');
    
    // Make a request for a user with a given ID
    axios.get('http://127.0.0.1:5000/user/12345')
         .then(res => {
           const resultData = res.data;
           const operations = []
           var timeCreatedList = resultData.TimeCreated.split(",");
           var usernameList = resultData.Username.split(",");
           var stockCodeList = resultData.StockCode.split(",");
           var stockPriceList = resultData.StockPrice.split(",");
           var tradeVolumeList = resultData.TradeVolume.split(",");
           var tradeTypeList = resultData.TradeType.split(",");

           for (var i = 0; i < timeCreatedList.length; i++) {
             operations.push({
              'TimeCreated': timeCreatedList[i], 
              'Username': usernameList[i],
              'StockCode': stockCodeList[i], 
              'StockPrice': stockPriceList[i],
              'TradeVolume': tradeVolumeList[i], 
              'TradeType': tradeTypeList[i],
             })
           } 

           this.setState({ operations });
         })
  }

  propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="StockView">
        <div className="StockView-header">
          <img src={logo} className="StockView-logo" alt="logo" />
          <h2>Welcome to StockDiary</h2>
        </div>
        <Paper>
          <Table className={this.propTypes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>TimeCreated</CustomTableCell>
                <CustomTableCell>Username</CustomTableCell>
                <CustomTableCell>StockCode</CustomTableCell>
                <CustomTableCell>StockPrice</CustomTableCell>
                <CustomTableCell>TradeVolume</CustomTableCell>
                <CustomTableCell>TradeType</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.operations.map(row => {
                return (
                  <TableRow className={this.propTypes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.TimeCreated}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.Username}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {row.StockCode}
                    </CustomTableCell>
                    <CustomTableCell numeric>{row.StockPrice}</CustomTableCell>
                    <CustomTableCell numeric>{row.TradeVolume}</CustomTableCell>
                    <CustomTableCell numeric>{row.TradeType}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );   
  }
}

export default StockView;
