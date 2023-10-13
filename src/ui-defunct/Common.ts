import { Dimensions } from 'react-native';

export const myWidth = Dimensions.get('window').width;
export const myHeight = Dimensions.get('window').height;
const standardWidth = 375.0;
const standardHeight = 667.0;

console.log(myWidth, myHeight);

export function scaledWidth(dimension: number) {
    return (dimension / standardWidth) * myWidth;
}

export function scaledHeight(dimension: number) {
    return (dimension / standardHeight) * myHeight;
}
