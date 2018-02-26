import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import img1 from './img/aeroplane-512x512.png';
import img2 from './img/package.png';

class Home extends Component {
    render() {
        return (
            <div>
                <Typography variant="display1" align={'center'}>
                    Home
                </Typography>
                <Typography variant={'headline'} align={'center'}>
                    <br/>
                    This is FlyWise - revolution in overseas shopping!
                    <br/>
                    <br/>
                    <img src={img1} style={{width:128,height:128}}/>
                    <img src={img2} style={{width:80,height:80}}/>
                </Typography>
            </div>
        );
    }
}
export default Home;