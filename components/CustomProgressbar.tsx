import { View, Text, DimensionValue } from 'react-native'
import React from 'react'
import Box from './Box'

interface IProps {
    activeColor?: string;
    height?: DimensionValue;
    percentage?: number;
}

const CustomProgressbar = ({ activeColor = 'blue', height = 10, percentage = 5 }: IProps) => {
  return (
    <Box width={'100%'} height={height}  borderRadius={100} overflow='hidden' style={{ backgroundColor: '#EAECF0' }}>
        <Box height={'100%'} width={`${percentage}%`} borderRadius={100} style={{ backgroundColor: activeColor}} />
    </Box>
  )
}

export default CustomProgressbar