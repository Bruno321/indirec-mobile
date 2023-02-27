import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const { width, height, fontScale } = Dimensions.get('window');

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
    return <Text style={styles.contentColumn}>{valueToRender}</Text>;
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
          <View style={{...styles.row}}>
            <View style={{...styles.actionColumn, width: width}}>
              {handleRender(actions.render(item.deportistaId, item, styles.actionColumn))}
            </View>
          </View>
        ) : null
      }
    </View>
  );
}

export const List = ({ dataSource, columns, loading, renderItem }) => {
  return loading ? (
    <View style={styles.fetchingContainer}>      
      <ActivityIndicator color="#0000ff"/>
    </View>
  ) : (
    dataSource.length ? (
      <View>
        <FlatList
          style={{height: "100%"}} 
          data={dataSource}
          renderItem={row => renderItem !== undefined ? renderItem(row.item) : Item(row, columns)}
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
    fontSize: width * .035 / fontScale,
  },
  contentColumn: {
    fontSize: width * .0325 / fontScale,
  },
  actionColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: width * 0.055,
  }
});
