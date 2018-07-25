import React, {Fragment} from 'react';
import Header from './Header';

class WebWrap extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <Fragment>
                <Header fixed={this.props.fixed} global={this.props.global} openAuth={this.props.openAuth} />
                <Fragment>
                    {this.props.children}
                </Fragment>
            </Fragment>
        );
    }
  
};


export default WebWrap;
