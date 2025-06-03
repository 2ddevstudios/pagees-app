import React from 'react';
import { Dimensions, Text, StyleSheet, View } from 'react-native';

// Clamp function
const clamp = (value: number, min: number, max:number) => {
  return Math.min(Math.max(value, min), max);
};

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');

// Define minimum and maximum font sizes
const minFontSize = 12;
const maxFontSize = 24;

// Calculate responsive font size based on screen width
const fontSize = clamp(screenWidth * 0.05, minFontSize, maxFontSize);


export function getDynamicFontSize(size: 'xs'|'sm'|'md'|'lg'|'xl'): number {
    switch(size) {
        case 'xs': {
            return clamp(screenWidth * 0.05, minFontSize, 14)
        }
        case 'sm': {
            return clamp(screenWidth * 0.05, minFontSize, 16)
        }
        case 'md': {
            return clamp(screenWidth * 0.05, 16, 18)
        }
        case 'lg': {
            return clamp(screenWidth * 0.05, 18, 24)
        }
        case 'xl': {
            return clamp(screenWidth * 0.05, 35, 50)
        }
        default: {
            return clamp(screenWidth * 0.05, minFontSize, maxFontSize);

        }
    }
}