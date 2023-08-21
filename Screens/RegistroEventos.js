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
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';


const { fontScale } = Dimensions.get("window");
const { width, height } = Dimensions.get("window");
const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;

const oInitialState = {
	nombre: "",
	fecha: null,
	hora: "",
	equipo_local_id: "",
	jugadoresLocales: [],
	equipo_visitante_id: "",
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
	nombre: yup.string().required("El nombre es requerido"),
	fecha: yup.date().required("La fecha es requerida"),
	hora: yup.string()
		.required("La hora es requerida"),
	equipo_local_id: yup.string().required("El nombre es requerido"),
	equipo_visitante_id: yup.string().required("El nombre es requerido"),
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

export const RegistroEventos = ({ navigation }) => {
	const [datePicker, setDatePicker] = useState(false);
	const [timePicker, setTimePicker] = useState(false);
	const [equipos, loading2] = useFetchData("equipos");
	const [form, setForm] = useState(oInitialState);
	const [time, setTime] = useState("AM");

	const listaEquipos = equipos.data.map((obj) => ({
		label: obj.nombre,
		value: obj.id,
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
	const [equipo_local_id, setequipo_local_id] = useState();
	const [equipo_visitante_id, setequipo_visitante_id] = useState();

	//Estados para guardar en arreglos los deportistas que participaran en el evento.
	const [listaJugadoresLocales, setListaJugadoresLocales] = useState([]);
	const [listaJugadoresVisitantes, setListaJugadoresVisitantes] = useState([]);

	//UseEffect para el equipo local
	useEffect(() => {
		const fetchequipo_local_id = async () => {
			if (equipo_local_id) {
				try{
					const response = await process(FIND, `equipos/${equipo_local_id.value}`);
					setListaJugadoresLocales([]);
					setJugadoresLocales(response.data.deportistas);
				}catch(e){
					console.log(e)
				}
			}
		};
		fetchequipo_local_id();
	}, [equipo_local_id]);

	//UseEffect para el equipo visitante
	useEffect(() => {
		const fetchequipo_visitante_id = async () => {
			if (equipo_visitante_id) {
				try {
					const response = await process(FIND, `equipos/${equipo_visitante_id.value}`);
					setListaJugadoresVisitantes([]);
					setJugadoresVisitantes(response.data.deportistas);
				} catch (e) {
					console.log(e)
				}
			}
		};
		fetchequipo_visitante_id();
	}, [equipo_visitante_id]);

	const listaLocales =
		jugadoresLocales &&
		jugadoresLocales.map((obj) => ({
			label: obj.nombres + " " + obj.apellidos,
			value: obj.id,
		}))
		;
		const listaVisitantes =
		jugadoresVisitantes &&
		jugadoresVisitantes.map((obj) => ({
			label: obj.nombres + " " + obj.apellidos,
			value: obj.id,
		}))

	const onSubmit = async (values, reset) => {
		let data = { ...values };
		values.hora = moment(values.hora).format("h:mm a")
		const idJugadoresLocales = jugadoresLocales.map(
			(jugador) => jugador.id
		);
		const idJugadoresVisitantes = jugadoresVisitantes.map(
			(jugador) => jugador.id
		);
		const concatJugadores = idJugadoresLocales.concat(idJugadoresVisitantes);
		data.jugadores = concatJugadores;
		console.log(data);
		try {
			const response = await process(SAVE, "eventos", values);
			console.log(JSON.stringify(response))
			if (response?.status == 201) {
				Alert.alert("Evento agregado exitosamente", response.data.message, [
					{
						text: "Okay",
						onPress: () => console.log('OK Pressed')
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

	function onDateSelected(event, value) {
		setDatePicker(false);
		setDateParams({
			 ...dateParams,
			 [calendario === 1 ? "fechaInicio" : "fechaFin"]:value,
		});
  };

	return (
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
			<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Registrar Eventos"}/>
			<View style={styles.center}>

				{/* FORM FIELDS */}
				<View style={styles.viewForm}>
				<Formik
					initialValues={oInitialState}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						const reset = () => {
							resetForm();
						};
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
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Nombre del evento</Text>
								<TextInput
									placeholder=""
									style={styles.input}
									multiline={true}
									onChangeText={handleChange("nombre")}
									value={values.nombre}
								/>
								<Text style={styles.error}>
									{touched.nombre && errors.nombre}
								</Text>
							</View>
							<View style={styles.subtitulo2}>
								<View>
									<View style={styles.btnSemana}>
										<TouchableCmp onPress={()=>setDatePicker(true)} onLongPress={()=>setFieldValue("fecha",null)}>
											<View style={styles.btnSemana2}>
												<Feather name={'calendar'} size={20} color={values.fecha?"#003070":"#808080"} />
												<Text style={values.fecha?styles.btnTxt:styles.btnTxtN}>{values.fecha?moment(values.fecha).format('DD-MM-YYYY'):"Fecha"}</Text>
											</View>
										</TouchableCmp>
									</View>
									{datePicker && (
										<DateTimePicker
											value={values.fecha?values.fecha:new Date()}
											mode={'date'}
											display={Platform.OS === 'ios' ? 'spinner' : 'default'}
											is24Hour={true}
											onChange={(event,value)=>{console.log(value),setDatePicker(false),setFieldValue("fecha",value)}}
											style={styles.datePicker}
										/>
									)}
								</View>
								<View>
									<View style={styles.btnSemana}>
										<TouchableCmp onPress={()=>setTimePicker(true)} onLongPress={()=>setFieldValue("hora",null)}>
											<View style={styles.btnSemana2}>
												<Feather name={'calendar'} size={20} color={values.hora?"#003070":"#808080"} />
												<Text style={values.hora?styles.btnTxt:styles.btnTxtN}>{values.hora?moment(values.hora).format("h:mm a"):"Hora"}</Text>
											</View>
										</TouchableCmp>
									</View>
									{timePicker && (
										<DateTimePicker
											value={values.hora?values.hora:new Date()}
											mode="time"
											display={Platform.OS === 'ios' ? 'spinner' : 'default'}
											is24Hour={true}
											style={styles.datePicker}
											onChange={(event,value)=>{console.log(moment(value).format("hh:mm")),setTimePicker(false),setFieldValue("hora",value)}}
										/>
									)}
								</View>
							</View>
							<Text style={styles.error}>
								{touched.fechaEvento && errors.fechaEvento}
							</Text>
							<Text style={styles.error}>
								{touched.horaEvento && errors.horaEvento}
							</Text>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Equipo local</Text>
								<Dropdown
									data={listaEquipos}
									labelField="label"
									valueField="value"
									placeholder="Selecciona un equipo"
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									search={true}
									onChange={(value) => {
										setFieldValue("equipo_local_id", value.value);
										setequipo_local_id(value);
									}}
									value={values.equipo_local_id}
								/>
								<Text style={styles.error}>
									{touched.equipo_local_id && errors.equipo_local_id}
								</Text>
							</View>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Jugadores locales</Text>
								<MultiSelect
									data={listaLocales}
									labelField="label"
									valueField="value"
									keyExtractor={(item) => item.value}
									placeholder="Selecciona un equipo"
									value={values.jugadoresLocales}
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									search={true}
									onChange={(value) => {
										setFieldValue("jugadoresLocales", value);
									}}
									renderSelectedItem={(item, unSelect,) => (
										<TouchableOpacity
											onPress={() => unSelect && unSelect(item)} key={item.value}
										>
											<View style={styles.selectedStyle} id={item.value}>
												<Text style={styles.textSelectedStyle} id={item.value}>
													{item.label}
												</Text>
												<AntDesign color="black" name="delete" size={17} id={item.value}/>
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
								<Text style={styles.campos}>Equipo visitante</Text>
								<Dropdown
									data={listaEquipos}
									labelField="label"
									valueField="value"
									placeholder="Selecciona un equipo"
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									search={true}
									onChange={(value) => {
										setFieldValue("equipo_visitante_id", value.value);
										setequipo_visitante_id(value);
									}}
									value={values.equipo_visitante_id}
								/>
								<Text style={styles.error}>
									{touched.equipo_visitante_id && errors.equipo_visitante_id}
								</Text>
							</View>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Jugadores visitantes</Text>
								<MultiSelect
									data={listaVisitantes}
									labelField="label"
									valueField="value"
									placeholder="Selecciona un equipo"
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
									search={true}
									searchPlaceholder="Buscar..."
									onChange={(value) => {
										setFieldValue("jugadoresVisitantes", value);
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
								<Text style={styles.campos}>Director técnico local</Text>
								<TextInput
									placeholder=""
									style={styles.input}
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
								<Text style={styles.campos}>
									Director técnico visitante
								</Text>
								<TextInput
									placeholder=""
									style={styles.input}
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
								<Text style={styles.campos}>Puntos equipo local</Text>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									onChangeText={handleChange("puntosLocal")}
									value={values.puntosLocal}
								/>
								<Text style={styles.error}>
									{touched.puntosLocal && errors.puntosLocal}
								</Text>
							</View>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Puntos equipo visitante</Text>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									onChangeText={handleChange("puntosVisitante")}
									value={values.puntosVisitante}
								/>
								<Text style={styles.error}>
									{touched.puntosVisitante && errors.puntosVisitante}
								</Text>
							</View>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Cancha</Text>
								<Dropdown
									data={facultitiesItems}
									labelField="label"
									valueField="value"
									placeholder="Selecciona una facultad"
									style={styles.dropdown1DropdownStyle}
									containerStyle={styles.dropdown1DropdownStyle}
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
								<Text style={styles.campos}>Jornada</Text>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									onChangeText={handleChange("jornada")}
									value={values.jornada}
								/>
								<Text style={styles.error}>
									{touched.jornada && errors.jornada}
								</Text>
							</View>
							<View style={styles.subtitulo}>
								<Text style={styles.campos}>Incidentes</Text>
								<TextInput
									placeholder=""
									style={styles.input}
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
			</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	general:{
		backgroundColor:'white',
	},
	center:{
		alignItems:'center'
	},
	titulo:{
		fontSize: 40,
	},
	viewForm:{
		width:width/1.25,
		marginTop:height/28,
	},
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
	  width: width * 0.8,
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
		backgroundColor: '#FFF',
		marginTop:-1.5
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
	input:{
		width:width/1.25,
		paddingLeft:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		// fontFamily: 'arial',
	},
	campos:{
		marginTop:15
	},
	btnSemana: {
		borderRadius: 15,
		width: '62%',
		borderColor: "#003070",
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		overflow: 'hidden'
	},
	btnSemana2: {
			padding: 10,
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
	},
	btnTxt: {
			fontSize: 17 / fontScale,
			color: "#003070",
	},
	btnTxtN: {
			fontSize: 17/ fontScale,
			color: "#808080",
	},
 });
 