import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';
import { Humidity, Temperature } from './ClimateChild';

type ClimateProps = { sensor: Sensor };

class Climate extends Component<ClimateProps> {
  render() {
    return (
      <div>
        <div id="temperature">
          <Temperature sensor={this.props.sensor} />
        </div>

        <hr />

        <div id="humidity">
          <Humidity sensor={this.props.sensor} />
        </div>
      </div>
    );
  }
}

export default Climate;