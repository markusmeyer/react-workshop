import React, { useState, useEffect } from 'react'
import { Sensor } from '../lib/Sensor';

interface ValueProps
{
  valueType: 'temperature' | 'humidity';
  sensor: Sensor;
  title: string;
}

export const ValueControl: React.FC<ValueProps> = ({valueType, sensor, title}: ValueProps) =>
{
  const [value, setValue] = useState<number>();
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();

  useEffect(() => {
    sensor.on(valueType, newValue =>
      {
        console.log(newValue + " " + minValue + " " + maxValue);
        setValue(newValue);
        if (!minValue || newValue < minValue)
          setMinValue(newValue);
        if (!maxValue || newValue > maxValue)
          setMaxValue(newValue);
      });
      return () => sensor.clearListeners();
  }, [valueType, sensor, minValue, maxValue]);

  const clearButtonClicked = () => {
    setMinValue(value);
    setMaxValue(value);
  };

  const displayValue = (valueToDisplay: number|undefined) => {
    const unit = valueType === 'temperature' ? '°C' : '%';
    return (valueToDisplay?.toFixed(1) ?? '-') + unit
  };

  return (
    <div id={valueType} style={{ width: 'auto', fontStretch: 'ultra-condensed' }}>
      <div style={{ fontSize: '5em', textAlign: 'right' }}>{displayValue(value)}</div>
      <div style={{ border: 'solid 1px', borderRadius: 5 }}>
        <span style={{fontSize: '0.75em'}}>low</span>
        <span> </span>
        <span style={{fontSize:'2em'}}>{displayValue(minValue)}</span>
        <span> </span>
        <span style={{fontSize:'2em'}}>{displayValue(maxValue)}</span>
        <span> </span>
        <span style={{fontSize: '0.75em'}}>high</span>
      </div>
    </div>);
};
// <button onClick={clearButtonClicked}>Clear</button>