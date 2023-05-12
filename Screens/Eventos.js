import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  ActionButton,
  EventosCard,
  FiltersView,
  Header,
  List,
  OrderView,
} from "../components";
import { useFetchData } from "../Hooks/Fetch.hook";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import { aFacultities } from "../Utils/Constants";
import TouchableCmp from "../assetsUI/TouchableCmp";
import * as yup from "yup";
import { Formik } from "formik";
import { process, SAVE, FIND } from "../Service/Api";
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Filters } from "../components/Filters";

const { fontScale } = Dimensions.get("window");
const { width, height } = Dimensions.get("window");
const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;

const oInitialState = {
  nombreEvento: "",
  fechaEvento: "",
  horaEvento: "",
  equipoLocal: "",
  jugadoresLocales: [],
  equipoVisitante: "",
  jugadores: [],
  jugadoresVisitantes: [],
  directorTecnicoLocal: "",
  directorTecnicoVisitante: "",
  puntosLocal: "",
  puntosVisitante: "",
  canchaJugada: "",
  jornada: "",
  incidentes: "",
};

const validationSchema = yup.object().shape({
  nombreEvento: yup.string().required("El nombre es requerido"),
  fechaEvento: yup.date().required("La fecha es requerida"),
  horaEvento: yup
    .string()
    .required("La hora es requerida")
    .matches(horaRegex, "La hora debe ser en el formato HH:MM"),
  // amPm: yup
  // 	.string()
  // 	.required('AM o PM requerido'),
  equipoLocal: yup.string().required("El nombre es requerido"),
  equipoVisitante: yup.string().required("El nombre es requerido"),
  directorTecnicoLocal: yup.string().required("El nombre es requerido"),
  directorTecnicoVisitante: yup.string().required("El nombre es requerido"),
  puntosLocal: yup
    .number()
    .integer("Debe ser un número entero")
    .required("Los puntos son requeridos"),
  puntosVisitante: yup
    .number()
    .integer("Debe ser un número entero")
    .required("Los puntos son requeridos"),
  canchaJugada: yup.string().required("La cancha es requerida"),
  jornada: yup
    .number()
    .integer("Debe ser un número entero")
    .required("La jornada es requerida"),
  incidentes: yup.string(),
});

export const Eventos = ({ navigation }) => {
  const [eventos, loading] = useFetchData("eventos");
  const [equipos, loading2] = useFetchData("equipos");
  const [form, setForm] = useState(oInitialState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState("AM");

  const listaEquipos = equipos.map((obj) => ({
    label: obj.nombre,
    value: obj.equipoId,
  }));
  const facultitiesItems = aFacultities.map((oFaculty) => ({
    label: `Facultad de ${oFaculty}`,
    value: oFaculty,
  }));

  //Se guarda en un estado el arreglo de los jugadores que corresponden a cada uno de los dos equipos.
  const [jugadoresLocales, setJugadoresLocales] = useState();
  const [jugadoresVisitantes, setJugadoresVisitantes] = useState();

  const [selected, setSelected] = useState([]);

  //Se guarda en un estado el id del equipo que será tanto local como visitante para posteriormente hacer la llamada de lo jugadores que corresponden a cada equipo seleccionado.
  const [equipoLocal, setEquipoLocal] = useState();
  const [equipoVisitante, setEquipoVisitante] = useState();

  //Estados para guardar en arreglos los deportistas que participaran en el evento.
  const [listaJugadoresLocales, setListaJugadoresLocales] = useState([]);
  const [listaJugadoresVisitantes, setListaJugadoresVisitantes] = useState([]);

  //UseEffect para el equipo local
  useEffect(() => {
    const fetchEquipoLocal = async () => {
      if (equipoLocal) {
        const response = await process(FIND, `equipos/${equipoLocal}`);
        setListaJugadoresLocales([]);
        setJugadoresLocales(response.data.data.jugadores);
      }
    };
    fetchEquipoLocal();
    console.log("BBBB: " + jugadoresLocales);
    console.log("BBBB: " + equipoLocal);
  }, [equipoLocal]);

  //UseEffect para el equipo visitante
  useEffect(() => {
    const fetchEquipoVisitante = async () => {
      if (equipoVisitante) {
        const response = await process(FIND, `${equipoVisitante}`);
        setListaJugadoresVisitantes([]);
        setJugadoresVisitantes(response.data.data.jugadores);
      }
    };
    fetchEquipoVisitante();
    console.log("AAAAA+ " + equipoVisitante);
  }, [equipoVisitante]);

  const listaLocales =
    jugadoresLocales &&
    jugadoresLocales.map((obj) => ({
      label: obj.nombres + " " + obj.apellidos,
      value: obj.deportistaId,
    }));
  const listaVisitantes =
    jugadoresVisitantes &&
    jugadoresVisitantes.map((obj) => ({
      label: obj.nombres + " " + obj.apellidos,
      value: obj.deportistaId,
    }));

  const horaItems = [
    {
      label: "AM",
      value: "AM",
    },
    {
      label: "PM",
      value: "PM",
    },
  ];

  const columns = [
    {
      nombre1: "Equipo 1",
      nombre2: "Equipo 2",
      fecha: "10/03/2023",
      hora: "11:00",
      campus: "Campus Juriquilla",
    },
    {
      nombre1: "Equipo A",
      nombre2: "Equipo B",
      fecha: "20/05/2024",
      hora: "20:00",
      campus: "Campus Cerropuerto",
    },
    {
      nombre1: "Equipo 0",
      nombre2: "Equipo 10",
      fecha: "05/01/2022",
      hora: "09:30",
      campus: "Campus Cadereyta",
    },
  ];

  const onSubmit = async (values, reset) => {
    let data = { ...values };
    const idJugadoresLocales = jugadoresLocales.map(
      (jugador) => jugador.deportistaId
    );
    const idJugadoresVisitantes = jugadoresVisitantes.map(
      (jugador) => jugador.deportistaId
    );
    const concatJugadores = idJugadoresLocales.concat(idJugadoresVisitantes);
    data.jugadores = concatJugadores;
    console.log(data);
    try {
      const response = await process(SAVE, "eventos", values);
      if (response?.data?.ok) {
        Alert.alert("Evento agregado exitosamente", response.data.message, [
          {
            text: "Okay",
            onPress: () => setModalVisible(false),
          },
        ]);
        reset();
      } else {
        Alert.alert("Oops...", "Algo salio mal, intenta mas tarde", [
          { text: "Okay" },
        ]);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Hubo un error", "Intente de nuevo", [{ text: "Okay" }]);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#003070" }} />
      <Header navigation={navigation} title={"Eventos"} />
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<FiltersView />
				<OrderView />
			</View>
            <View style={{ flexDirection:'row', justifyContent: 'center' }}>
                <ActionButton
                    style={{ marginTop: 20, marginBottom: 20 }}
                    icon={<Ionicons name="trophy-outline" size={18} color={"white"}/>}
                    handler={() => setModalVisible(true)}
                    color="#FFF"
                    backgroundColor="#003070"
                    text="Agregar Evento"
                    widthPercentage={0.9}
                    heightPercentage={0.04}
                />
            </View> */}
      <View
        style={{
          paddingVertical: 24,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Filters />
        <TouchableCmp onPress={() => setModalVisible(true)}>
          <View style={styles.agregarJugadorButton}>
            <MaterialCommunityIcons
              name={"clipboard-list-outline"}
              size={24}
              color={"white"}
            />
            <Text style={styles.buttonText}>Pasar lista</Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.cartas} showsVerticalScrollIndicator={false}>
        <List
          dataSource={eventos}
          loading={loading}
          renderItem={(row) => (
            <EventosCard props={row} navigation={navigation} />
          )}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ScrollView
          style={styles.modal}
          contentContainerStyle={[styles.contentContainer]}
        >
          <Formik
            initialValues={oInitialState}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const reset = () => {
                resetForm();
              };
              values.horaEvento += " " + time;
              onSubmit(values, reset);
            }}
          >
            {({
              setFieldValue,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.tituloModal}>
                  <Text style={styles.titleModal}>Agregar Evento</Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Nombre del evento</Text>
                  <TextInput
                    placeholder="Bernal Colín"
                    style={styles.txt}
                    multiline={true}
                    onChangeText={handleChange("nombreEvento")}
                    value={values.nombreEvento}
                  />
                  <Text style={styles.error}>
                    {touched.nombreEvento && errors.nombreEvento}
                  </Text>
                </View>
                <View style={styles.subtitulo2}>
                  <View>
                    <Text style={styles.txtTitulo}>Fecha</Text>
                    <TextInput
                      placeholder="DD/MM/AA"
                      style={styles.txt2}
                      onChangeText={handleChange("fechaEvento")}
                      value={values.fechaEvento}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtTitulo}>Hora</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: width * 0.37,
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        placeholder="HH:MM"
                        style={styles.txt3}
                        onChangeText={handleChange("horaEvento")}
                        value={values.horaEvento}
                      />
                      <Dropdown
                        data={horaItems}
                        labelField="label"
                        valueField="value"
                        placeholder=""
                        style={styles.dropdown1DropdownStyle}
                        containerStyle={styles.dropdown1}
                        onChange={({ value }) => {
                          setTime(value);
                        }}
                        value={time}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles.error}>
                  {touched.fechaEvento && errors.fechaEvento}
                </Text>
                <Text style={styles.error}>
                  {touched.horaEvento && errors.horaEvento}
                </Text>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Equipo local</Text>
                  <Dropdown
                    data={listaEquipos}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona un equipo"
                    style={styles.dropdown1DropdownStyle2}
                    containerStyle={styles.dropdown2}
                    search={true}
                    onChange={({ value }) => {
                      setFieldValue("equipoLocal", value);
                      setEquipoLocal(value);
                    }}
                    value={values.equipoLocal}
                  />
                  <Text style={styles.error}>
                    {touched.equipoLocal && errors.equipoLocal}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Jugadores locales</Text>
                  <MultiSelect
                    data={listaLocales}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona un equipo"
                    value={values.jugadoresLocales}
                    style={styles.dropdown1DropdownStyle2}
                    containerStyle={styles.dropdown2}
                    search={true}
                    onChange={(value) => {
                      setFieldValue("jugadoresLocales", value);
                      console.log(values.jugadoresLocales);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>
                            {item.label}
                          </Text>
                          <AntDesign color="black" name="delete" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                    searchPlaceholder="Buscar..."
                  />
                  <Text style={styles.error}>
                    {touched.jugadoresLocales && errors.jugadoresLocales}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Equipo visitante</Text>
                  <Dropdown
                    data={listaEquipos}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona un equipo"
                    style={styles.dropdown1DropdownStyle2}
                    containerStyle={styles.dropdown2}
                    search={true}
                    onChange={({ value }) => {
                      setFieldValue("equipoVisitante", value);
                      setEquipoVisitante(value);
                    }}
                    value={values.equipoVisitante}
                  />
                  <Text style={styles.error}>
                    {touched.equipoVisitante && errors.equipoVisitante}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Jugadores visitantes</Text>
                  <MultiSelect
                    data={listaVisitantes}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona un equipo"
                    style={styles.dropdown1DropdownStyle2}
                    containerStyle={styles.dropdown2}
                    search={true}
                    searchPlaceholder="Buscar..."
                    onChange={(value) => {
                      setFieldValue("jugadoresVisitantes", value);
                      console.log(values.jugadoresVisitantes);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>
                            {item.label}
                          </Text>
                          <AntDesign color="black" name="delete" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                    value={values.jugadoresVisitantes}
                  />
                  <Text style={styles.error}>
                    {touched.jugadoresVisitantes && errors.jugadoresVisitantes}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Director técnico local</Text>
                  <TextInput
                    placeholder="Jorge Alejandro"
                    style={styles.txt}
                    multiline={true}
                    onChangeText={handleChange("directorTecnicoLocal")}
                    value={values.directorTecnicoLocal}
                  />
                  <Text style={styles.error}>
                    {touched.directorTecnicoLocal &&
                      errors.directorTecnicoLocal}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>
                    Director técnico visitante
                  </Text>
                  <TextInput
                    placeholder="Jorge Bernal"
                    style={styles.txt}
                    multiline={true}
                    onChangeText={handleChange("directorTecnicoVisitante")}
                    value={values.directorTecnicoVisitante}
                  />
                  <Text style={styles.error}>
                    {touched.directorTecnicoVisitante &&
                      errors.directorTecnicoVisitante}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Puntos equipo local</Text>
                  <TextInput
                    style={styles.txtNum}
                    keyboardType="numeric"
                    onChangeText={handleChange("puntosLocal")}
                    value={values.puntosLocal}
                  />
                  <Text style={styles.error}>
                    {touched.puntosLocal && errors.puntosLocal}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Puntos equipo visitante</Text>
                  <TextInput
                    style={styles.txtNum}
                    keyboardType="numeric"
                    onChangeText={handleChange("puntosVisitante")}
                    value={values.puntosVisitante}
                  />
                  <Text style={styles.error}>
                    {touched.puntosVisitante && errors.puntosVisitante}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Cancha</Text>
                  <Dropdown
                    data={facultitiesItems}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona una facultad"
                    style={styles.dropdown1DropdownStyle2}
                    containerStyle={styles.dropdown2}
                    search={true}
                    onChange={({ value }) => {
                      setFieldValue("canchaJugada", value);
                    }}
                    value={values.canchaJugada}
                  />
                  <Text style={styles.error}>
                    {touched.canchaJugada && errors.canchaJugada}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Jornada</Text>
                  <TextInput
                    style={styles.txtNum}
                    keyboardType="numeric"
                    onChangeText={handleChange("jornada")}
                    value={values.jornada}
                  />
                  <Text style={styles.error}>
                    {touched.jornada && errors.jornada}
                  </Text>
                </View>
                <View style={styles.subtitulo}>
                  <Text style={styles.txtTitulo}>Incidentes</Text>
                  <TextInput
                    placeholder="Ingrese aquí..."
                    style={styles.txt}
                    multiline={true}
                    onChangeText={handleChange("incidentes")}
                    value={values.incidentes}
                  />
                  <Text style={styles.error}>
                    {touched.incidentes && errors.incidentes}
                  </Text>
                </View>
                <View style={styles.boton}>
                  {/* <TouchableCmp onPress={()=>onSubmit(values)}> */}
                  <TouchableCmp onPress={handleSubmit}>
                    <View style={styles.btn}>
                      <Text style={styles.txtBtn}>Agregar Evento</Text>
                    </View>
                  </TouchableCmp>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    // height: '95%',
  },
  cartas: {
    // marginTop:10,
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    flex: 1,
    // paddingBottom:280
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
  },
  titulo: {
    padding: 30,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 33,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  tituloModal: {
    marginBottom: 20,
  },
  txtTitulo: {
    fontFamily: "Fredoka-Medium",
    fontSize: 20 / fontScale,
    paddingLeft: 3,
  },
  titleModal: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 30 / fontScale,
    textAlign: "center",
  },
  subtitulo: {
    marginTop: 25,
  },
  subtitulo2: {
    marginTop: 25,
    flexDirection: "row",
    width: width * 0.7,
    justifyContent: "space-between",
  },
  txt: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    paddingLeft: 3,
    marginVertical: 5,
    width: width * 0.7,
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
  },
  txtNum: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    paddingLeft: 3,
    marginVertical: 5,
    width: width * 0.2,
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
  },
  txt2: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    paddingLeft: 3,
    marginVertical: 5,
    width: width * 0.3,
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
  },
  txt3: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    paddingLeft: 3,
    marginVertical: 5,
    width: width * 0.2,
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  dropdown1DropdownStyle: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    backgroundColor: "#FFF",
    width: width * 0.16,
    borderWidth: 1,
    borderRadius: 15,
    height: height * 0.05,
    paddingLeft: 10,
  },
  dropdown1: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    backgroundColor: "#FFF",
    width: width * 0.16,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: -1.5,
  },
  dropdown1DropdownStyle2: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    width: width * 0.7,
    borderWidth: 1,
    borderRadius: 15,
    height: height * 0.05,
    paddingLeft: 10,
    backgroundColor: "#FFF",
    marginTop: -1.5,
  },
  dropdown2: {
    fontFamily: "Fredoka-Light",
    fontSize: 18 / fontScale,
    width: width * 0.7,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FFF",
    marginTop: -1.5,
  },
  btn: {
    paddingVertical: 8,
    width: width * 0.4,
    borderRadius: 15,
    backgroundColor: "#003070",
  },
  txtBtn: {
    fontFamily: "Fredoka-Regular",
    fontSize: 17 / fontScale,
    color: "white",
    textAlign: "center",
  },
  boton: {
    marginTop: 20,
    alignItems: "flex-end",
    overflow: "hidden",
  },
  error: {
    fontFamily: "Fredoka-Light",
    color: "#BA1200",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  agregarJugadorButton: {
    width: width * 0.45,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#003070",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 12,
    // marginBottom: 12,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  },
});
