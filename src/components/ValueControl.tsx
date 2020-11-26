import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Sensor } from '../lib/Sensor';
import { resetHumidityMinMax, resetTemperatureMinMax, selectHumidity, selectTemperature, setHumidity, setTemperature } from '../state/ClimateSlice';

interface ValueProps
{
  valueType: 'temperature' | 'humidity';
  sensor: Sensor;
  title: string;
}

export const ValueControl: React.FC<ValueProps> = ({valueType, sensor, title}: ValueProps) =>
{
  const tuple = useSelector(valueType === 'temperature' ? selectTemperature : selectHumidity);
  const dispatch = useDispatch();
  const setValue = valueType === 'temperature' ? setTemperature : setHumidity;
  const resetMinMax = valueType === 'temperature' ? resetTemperatureMinMax : resetHumidityMinMax;

  useEffect(() =>
  {
    function sensorValueChanged(newValue: number)
    {
      dispatch(setValue(newValue));
    }

    sensor.on(valueType, sensorValueChanged);

    return () => sensor.off(valueType, sensorValueChanged);

  }, [valueType, sensor, dispatch, setValue]);

  const clearButtonClicked = () => {
    dispatch(resetMinMax());
  };

  const displayValue = (valueToDisplay: number|undefined) => {
    const unit = valueType === 'temperature' ? '°C' : '%';
    return (valueToDisplay?.toFixed(1) ?? '-') + unit
  };

  return (
    <div id={valueType} style={{ width: 'auto', fontStretch: 'ultra-condensed' }}>
      <div style={{ fontSize: '5em', textAlign: 'right' }}>{displayValue(tuple.value)}</div>
      <div style={{ border: 'solid 1px', borderRadius: 5 }}>
        <span style={{fontSize: '0.75em'}}>low</span>
        <span> </span>
        <span style={{fontSize:'2em'}}>{displayValue(tuple.min)}</span>
        <span> </span>
        <span style={{fontSize:'2em'}}>{displayValue(tuple.max)}</span>
        <span> </span>
        <span style={{fontSize: '0.75em'}}>high</span>
        <button onClick={clearButtonClicked}>Clear</button>
      </div>
    </div>);
};
