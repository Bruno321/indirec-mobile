import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const handleInnerFields = index => {
  const [val, ...attrs] = index.split('.');

  let innerFields = `['${val}']`;
  for (const item of attrs) {
    innerFields += `['${item}']`;
  }

  return `item${innerFields}`;
};

const handleRender = valueToRender => {
  const type = typeof valueToRender;

  if (type === 'string' || type === 'number') {
    return <Text>{valueToRender}</Text>;
  }

  return valueToRender;
};

// TODO: What happens if there are more than 4 columns? (In terms of styling)

const Item = ({item}, columns) => {
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
                  handleRender(render(dataIndex.includes('.') ? item[dataIndex.split('.')[0]] : item[dataIndex], item)) // ? render(value, record)
                ) : (
                  <Text style={styles.contentColumn}>
                    {
                      dataIndex.includes('.') ? 
                        eval(handleInnerFields(dataIndex))
                      :
                        item[dataIndex]
                    }
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
              {handleRender(actions.render(item.deportistaId, item, styles.actionColumn))}
            </View>
          </View>
        ) : null
      }
    </View>
  );
}

export const List = ({ dataSource, columns, loading }) => {
  return loading ? (
    <View style={styles.fetchingContainer}>      
      <ActivityIndicator color="#0000ff"/>
    </View>
  ) : (
    dataSource.length ? (
      <View>
        <FlatList 
          data={dataSource}
          renderItem={row => Item(row, columns)}
        />
      </View>
    ) : (
      <View style={styles.fetchingContainer}>      
        <Text>No hay datos</Text>
      </View>
    )
  )
};

const styles = StyleSheet.create({
  fetchingContainer: {
    height: height * 0.75,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
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
    marginRight: width * 0.055,
  }
});
