import { Dimensions, StyleSheet, Text, View } from 'react-native';
const { width, height } = Dimensions.get('window');
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TouchableCmp from '../assetsUI/TouchableCmp';

export const ActionButton = ({
  backgroundColor,
  color,
  handler,
  icon,
  text,
  widthPercentage,
  heightPercentage,
  style = {},
}) => {
  return (
    <TouchableCmp onPress={handler}>
      <View style={{ 
        ...styles.viewButton,
        width: width * widthPercentage,
    		height:height * heightPercentage,
        backgroundColor, 
        ...style 
      }}>
      {typeof icon === 'string' ? (
        <FontAwesome name={icon} size={20} color={color} />
      ) : (
        icon
      )}
      {text !== undefined && text !== '' ? (
        <Text style={{color, fontSize: 20, marginLeft: 10}}>{ text }</Text>
      ) : null}
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  viewButton:{
    display: 'flex',
    flexDirection: 'row',
		borderRadius:5,
		backgroundColor:'#003070',
		justifyContent:'center',
    alignItems:'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
});
