import React, {Component} from 'react';
import Chart from '../services/Chart';

class ChartsView extends Component {
    render (){
        return (
            <div>
                <Chart width="200" height="100" stock="pzza" type="simple" time="month"/>
                <br/>
                <Chart width="600" height="400" stock="aapl" type="full"/>
            </div>
        )
    }
}

export default ChartsView;