import { Dimensions, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export const ActionButton = ({
  backgroundColor,
  color,
  handler,
  icon,
  text,
  style = {},
}) => {
  return (
    <View style={{...styles.buttonContainer, ...style}}>
      <FontAwesome.Button
        backgroundColor={backgroundColor}
        color={color}
        onPress={handler ? handler : () => console.log('No handler')}
        name={icon}
        style={styles.buttonContent}
      >
        {text}
      </FontAwesome.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: width * 0.01,
    marginRight: width * 0.01
  },
  buttonContent: {
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
    justifyContent: 'center',
  }
});
