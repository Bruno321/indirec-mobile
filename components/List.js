import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const handleRender = valueToRender => {
  const type = typeof valueToRender;

  if (type === 'string' || type === 'number') {
    return <Text>{valueToRender}</Text>;
  }

  return valueToRender;
};

// TODO: What happens if there are more than 4 columns? (In terms of styling)

export const Item = ({item}, columns) => {
  let dataColumns = columns.filter(c => c.dataIndex !== 'id');
  let actions = columns.find(c => c.dataIndex === 'id');

  return (
    <View style={styles.container} key={item.id}>
      <View style={styles.row}>
        {
          dataColumns.map(({ title, dataIndex, render }) => (
            <View style={{...styles.column, width: width / dataColumns.length}} key={dataIndex}>

              <Text style={styles.titleColumn}>
                {title}
              </Text>
              {
                render !== undefined ? (
                  handleRender(render(item[dataIndex], item)) // ? render(value, record)
                ) : (
                  <Text style={styles.contentColumn}>
                    {item[dataIndex]}
                  </Text>
                )
              }

            </View>
          ))
        }
      </View>
      {
        actions ? (
          <View style={{...styles.row, marginBottom: height * 0.02}}>
            <View style={{...styles.actionColumn, width: width}}>
              {handleRender(actions.render(item.id, item, styles.actionColumn))}
            </View>
          </View>
        ) : null
      }
    </View>
  );
}

export default  List = ({ dataSource, columns }) => {
  return (
    <View>
      <FlatList 
        data={dataSource}
        renderItem={row => Item(row, columns)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
		borderBottomColor:'#D9D9D9',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    alignItems: 'center',
    padding: '3%'
  },
  titleColumn: {
    fontWeight: 'bold',
    fontSize: width * .039,
  },
  contentColumn: {
    fontSize: width * .037,
  },
  actionColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
