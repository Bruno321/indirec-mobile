import { Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { FIND, process } from '../Service/Api';

export const useFetchData = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const response = await process(FIND, path, {}, {});

    if (response.data) {
      setData(response.data.data);
    } else {
      Alert.alert(
        'Error', 
        `No se pudo consultar hacia ${path}`,
        [
          {text:'Okay'},
        ]
      );
    }

    setLoading(false);
  }, [process]);

  useEffect(() => {
    getData();
  }, [getData]);

  const update = () => getData();

  return [data, loading, update];
};
