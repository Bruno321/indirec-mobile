import { StyleSheet, View } from 'react-native';

export const Row = ({ children, style = {} }) => 
  <View style={{ ...oStyles.row, ...style }}>
    {children}
  </View>;

export const Col = ({ children, style = {} }) => 
  <View style={{ ...oStyles.col, ...style }}>
    {children}
  </View>;

const oStyles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
});