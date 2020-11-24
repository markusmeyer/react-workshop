import React, { useState, useEffect } from 'react'
import { Sensor, SensorEvent } from '../lib/Sensor';

interface ClimateChildProps {
    sensor: Sensor;
    type: SensorEvent;
    unit: string;
}

interface ClimateTuple {
    min: number | null;
    current: number | null;
    max: number | null;
}

function ClimateChild (props: ClimateChildProps) {
    const [myTuple, setTuple] = useState<ClimateTuple>({
        min: null,
        current: null,
        max: null,
    });

    useEffect(() => {
        function updateStuffs(value: number) {
            setTuple(({min, max}) => {
                return {
                    min: Math.min(min || Infinity, value),
                    current: value,
                    max: Math.max(max || -Infinity, value)
                };
            });
        }

        props.sensor.on(props.type, updateStuffs);

        return () => props.sensor.off(props.type, updateStuffs);
    }, [props.sensor, props.type]);

    function reset() {
        setTuple({ 
            ...myTuple,
            min: myTuple.current, 
            max: myTuple.current
        });
    }

    function format(value: number | null) {
        if (!value) return '-';

        return `${value.toFixed(1)} ${props.unit}`;
    }

    return (
        <div>
            <div>min: {format(myTuple.min)}</div>
            <div>current: {format(myTuple.current)}</div>
            <div>max: {format(myTuple.max)}</div>

            <button onClick={reset}>reset</button>
        </div>
    );
}

export function Temperature(props: {sensor: Sensor}) {
    return <ClimateChild sensor={props.sensor} unit='°C' type="temperature" />
}

export function Humidity(props: {sensor: Sensor}) {
    return <ClimateChild sensor={props.sensor} unit='%' type="humidity" />
}