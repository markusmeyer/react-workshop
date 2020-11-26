import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Sensor } from '../lib/Sensor';
import { createReloadThunk, selectErrorOccurred, selectUpdating } from '../state/ClimateSlice';
import { ValueControl } from './ValueControl'

type ClimateProps = { sensor: Sensor };

const Climate: React.FC<ClimateProps> = (props: ClimateProps) =>
{
  const dispatch = useDispatch();
  const updating = useSelector(selectUpdating);
  const errorOccurred = useSelector(selectErrorOccurred);
  return (
    <div style={{backgroundColor: '#BDC4B4', padding: 10, margin: 30, width: 280}}>
      <ValueControl valueType="temperature" sensor={props.sensor} title="Temperature"/>
      <ValueControl valueType="humidity" sensor={props.sensor} title="Humidity"/>
      <button onClick={() => dispatch(createReloadThunk())} disabled={updating}>
        {updating ? "loading..." : "Reload"}
      </button>
      {errorOccurred ? (<div>Error occurred while retrieving values</div>) : null}
    </div>
  );
}

export default Climate;