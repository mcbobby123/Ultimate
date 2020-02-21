import React from 'react';
import Grid from '../Grid/Grid';
import PlaySpace from '../PlaySpace/PlaySpace';

class SubBoard extends React.Component{
    render(){
        return (
            <Grid {...this.props} type={PlaySpace} legal={this.props.legal?-1:9}/>
        );
    }
}

export default SubBoard;
