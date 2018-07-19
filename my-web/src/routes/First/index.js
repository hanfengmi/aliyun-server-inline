import React,{ Fragment } from 'react';
import { connect } from 'dva';

@connect(({ example }) => ({
  example,
}))

class First extends React.Component {

  render(){
      return (
        <div style={{borderBottom:'1px solid #ccc'}}>
          <Fragment>
              First
          </Fragment>
        </div>
      );
  }
  
};


export default First;