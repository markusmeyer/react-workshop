import React, { useState, useEffect } from 'react'
import { Sensor } from '../lib/Sensor';

interface ValueProps
{
  valueType: 'temperature' | 'humidity';
  sensor: Sensor;
  title: string;
}

interface Tuple
{
  value: number|undefined;
  min: number|undefined;
  max: number|undefined;
}

export const ValueControl: React.FC<ValueProps> = ({valueType, sensor, title}: ValueProps) =>
{
  const [tuple, setTuple] = useState<Tuple>({value:undefined, min:undefined, max:undefined});

  useEffect(() =>
  {
    function sensorValueChanged(newValue: number)
    {
      setTuple(oldTuple => ({
        value: newValue,
        min: !oldTuple.min || newValue < oldTuple.min ? newValue : oldTuple.min,
        max: !oldTuple.max || newValue > oldTuple.max ? newValue : oldTuple.max,
      }));
    }

    sensor.on(valueType, sensorValueChanged);

    return () => sensor.off(valueType, sensorValueChanged);

  }, [valueType, sensor]);

  const clearButtonClicked = () => {
    setTuple({
      value: tuple.value,
      min:tuple.value,
      max:tuple.value});
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
      </div>
    </div>);
};
// <button onClick={clearButtonClicked}>Clear</button>