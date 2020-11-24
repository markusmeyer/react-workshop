import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';
import { ValueControl } from './ValueControl'

type ClimateProps = { sensor: Sensor };

class Climate extends Component<ClimateProps> {
  render() {
    return (
      <div style={{backgroundColor: '#BDC4B4', padding: 10, margin: 30, width: 280}}>
        <ValueControl valueType="temperature" sensor={this.props.sensor} title="Temperature"/>
        <ValueControl valueType="humidity" sensor={this.props.sensor} title="Humidity"/>
      </div>
    );
  }
}

export default Climate;