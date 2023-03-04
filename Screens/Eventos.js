import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TextInput, Alert } from "react-native";
import { ActionButton, EventosCard , FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import {Ionicons} from '@expo/vector-icons';
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import { aFacultities } from '../Utils/Constants';
import TouchableCmp from '../assetsUI/TouchableCmp';
import * as yup from "yup";
import { Formik } from 'formik';
import { process, SAVE, FIND } from "../Service/Api";

const { fontScale } = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/ 

const oInitialState = {
	nombre: '',
	fecha: '',
	hora: '',
	equipoLocal: '',
	jugadoresLocales:'',
	equipoVisitante: '',
	jugadoresVisitantes:'',
	dtLocal: '',
	dtVisitante: '',
	puntosLocal: '',
	puntosVisitante: '',
	cancha: '',
	jornada: '',
	incidentes: '',
};

const validationSchema = yup.object().shape({
	nombre: yup
		.string()
		.required('El nombre es requerido'),
	fecha: yup
		.date()
		.required('La fecha es requerida'),
	hora: yup
		.string()
		.required('La hora es requerida')
		.matches(horaRegex, 'La hora debe ser en el formato HH:MM'),
	amPm: yup
		.string()
		.required('AM o PM requerido'),
	equipoLocal: yup
		.string()
		.required('El nombre es requerido'),
	equipoVisitante: yup
		.string()
		.required('El nombre es requerido'),
	dtLocal: yup
		.string()
		.required('El nombre es requerido'),
	dtVisitante: yup
		.string()
		.required('El nombre es requerido'),
	puntosLocal: yup
		.number()
		.integer('Debe ser un número entero')
		.required('Los puntos son requeridos'),
	puntosVisitante: yup
		.number()
		.integer('Debe ser un número entero')
		.required('Los puntos son requeridos'),
	cancha: yup
		.string()
		.required('La cancha es requerida'),
	jornada: yup
		.number()
		.integer('Debe ser un número entero')
		.required('La jornada es requerida'),
	incidentes: yup
		.string()
});

export const Eventos = ({ navigation }) => {
	const [eventos, loading] = useFetchData('eventos');
	const [equipos, loading2] = useFetchData('equipos');
	const [form, setForm] = useState(oInitialState);
	const [isModalVisible, setModalVisible] = useState(false);
	const [time, setTime] = useState('AM')

	const listaEquipos = equipos.map(obj=>({
		label:obj.nombre,
		value: obj.equipoId
	}))
	const facultitiesItems = aFacultities.map(oFaculty => ({
		label: `Facultad de ${oFaculty}`,
		value: oFaculty,
	}));

	//Se guarda en un estado el arreglo de los jugadores que corresponden a cada uno de los dos equipos. 
	const [jugadoresLocales, setJugadoresLocales] = useState();
	const [jugadoresVisitantes, setJugadoresVisitantes] = useState();
  
	//Se guarda en un estado el id del equipo que será tanto local como visitante para posteriormente hacer la llamada de lo jugadores que corresponden a cada equipo seleccionado.
	const [equipoLocal, setEquipoLocal] = useState();
	const [equipoVisitante, setEquipoVisitante] = useState();
  
	//Estados para guardar en arreglos los deportistas que participaran en el evento. 
	const [listaJugadoresLocales, setListaJugadoresLocales] = useState([]);
	const [listaJugadoresVisitantes, setListaJugadoresVisitantes] = useState([]);
  
	//Estado que sirve para que el arreglo vuelva a estar vacio si el usuario cambia el equipo en la etiqueta select
	const [limpiarJugadoresLocales, setLimpiarJugadoresLocales] = useState(false);
	const [limpiarJugadoresVisitantes, setLimpiarJugadoresVisitantes] = useState(false);

	//UseEffect para el equipo local
	useEffect(() => {
		const fetchEquipoLocal = async() => {
			if(equipoLocal){
			const response = await process(FIND, `equipos/${equipoLocal}`);
			setListaJugadoresLocales([]);
			setJugadoresLocales(response.data.data.jugadores);
			}
		}
		fetchEquipoLocal();
	}, [equipoLocal])

	//UseEffect para el equipo visitante
	useEffect(() => {
		const fetchEquipoVisitante = async() => {
		  if(equipoVisitante){
			const response = await process(FIND, `equipos/${equipoVisitante}`);
			setListaJugadoresVisitantes([]);
			setJugadoresVisitantes(response.data.data.jugadores);
		  }
		}
		fetchEquipoVisitante();
	}, [equipoVisitante])

	console.log(jugadoresLocales)
	console.log(jugadoresVisitantes)

	const listaLocales = jugadoresLocales&&jugadoresLocales.map(obj=>({
		label:obj.nombres + " " + obj.apellidos,
		value: obj.deportistaId
	}))
	const listaVisitantes = jugadoresVisitantes&&jugadoresVisitantes.map(obj=>({
		label:obj.nombres + " " + obj.apellidos,
		value: obj.deportistaId
	}))
	
	const horaItems = [
		{
			label: 'AM',
			value: 'AM',
		},
		{
			label: 'PM',
			value: 'PM',
		}
	];

    const columns = [
        {
            nombre1: "Equipo 1",
            nombre2: "Equipo 2",
            fecha: "10/03/2023",
            hora: "11:00",
            campus: "Campus Juriquilla"
        },
        {
            nombre1: "Equipo A",
            nombre2: "Equipo B",
            fecha: "20/05/2024",
            hora: "20:00",
            campus: "Campus Cerropuerto"
        },
        {
            nombre1: "Equipo 0",
            nombre2: "Equipo 10",
            fecha: "05/01/2022",
            hora: "09:30",
            campus: "Campus Cadereyta"
        },
    ]

	const onSubmit = async (values, reset) => {
		console.log("SI")
		const FormData = global.FormData;
		let oSend = new FormData();
		//values.hora+=" "+time
		for (const sKey in values) {
			oSend.append(sKey, values[sKey]);
		}
		try{
			const response = await process(SAVE, 'eventos', oSend);
			if (response?.data?.ok) {
				Alert.alert(
					'Evento agregado exitosamente',
					response.data.message,
					[
						{text:'Okay'},
					]
				);
				reset();
			} else {
				Alert.alert(
					'Oops...',
					'Algo salio mal, intenta mas tarde',
					[
						{text:'Okay'},
					]
				);
			}
		}catch(e){
			console.log(e)
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Eventos"}/>
			<SearchInput />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            </View>
			<View style={styles.cartas} showsVerticalScrollIndicator={false}>
				<List
					dataSource={eventos}
					loading={loading}
					renderItem= {row => <EventosCard props={row} navigation={navigation} />}
				/>
			</View>
			<Modal isVisible={isModalVisible} onRequestClose={() => {setModalVisible(false)}}>
				<ScrollView style={styles.modal} contentContainerStyle={[styles.contentContainer]}>
					<Formik
						initialValues={oInitialState}
						validationSchema={validationSchema}
						onSubmit={(values, { resetForm }) => {
							console.log("HROA")
							const reset = () => {
								resetForm();
							};
							onSubmit(values, reset);
						}}
					>
					{({ setFieldValue, handleChange, handleSubmit, values, errors, touched }) => (
					<>
						<View style={styles.tituloModal}>
							<Text style={styles.titleModal}>Agregar Evento</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Nombre del evento</Text>
							<TextInput
								placeholder='Bernal Colín'
								style={styles.txt}
								multiline={true}
								onChangeText={handleChange('nombre')}
								value={values.nombre}
							/>
							<Text style={styles.error}>{touched.nombre && errors.nombre}</Text>
						</View>
						<View style={styles.subtitulo2}>
							<View>
								<Text style={styles.txtTitulo}>Fecha</Text>
								<TextInput
									placeholder='DD/MM/AA'
									style={styles.txt2}
									onChangeText={handleChange('fecha')}
									value={values.fecha}
								/>
							</View>
							<View>
								<Text style={styles.txtTitulo}>Hora</Text>
								<View style={{flexDirection:'row',justifyContent:'space-between', width:width*.37, alignItems:'center'}}>
									<TextInput
										placeholder='HH:MM'
										style={styles.txt3}
										onChangeText={handleChange('hora')}
										value={values.hora}
									/>
									<Dropdown 
										data={horaItems}
										labelField="label"
										valueField="value"
										placeholder=''
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
						<Text style={styles.error}>{touched.fecha && errors.fecha}</Text>
						<Text style={styles.error}>{touched.hora && errors.hora}</Text>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Equipo local</Text>
								<Dropdown 
									data={listaEquipos}
									labelField="label"
									valueField="value"
									placeholder='Selecciona un equipo'
									style={styles.dropdown1DropdownStyle2}
									containerStyle={styles.dropdown2}
									search={true}
									onChange={({ value }) => {
										setFieldValue('equipoLocal', value);
										setEquipoLocal(value)
										setLimpiarJugadoresLocales(!limpiarJugadoresLocales)
									}}
									value={values.equipoLocal}
								/>
								<Text style={styles.error}>{touched.equipoLocal && errors.equipoLocal}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Jugadores locales</Text>
								<MultiSelect 
									data={listaLocales}
									labelField="label"
									valueField="value"
									placeholder='Selecciona un equipo'
									style={styles.dropdown1DropdownStyle2}
									containerStyle={styles.dropdown2}
									search={true}
									onChange={({ value }) => {
										setFieldValue('jugadoresLocales', value);
										setJugadoresLocales(value)
									}}
									value={values.jugadoresLocales}
								/>
								<Text style={styles.error}>{touched.equipoLocal && errors.equipoLocal}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Equipo visitante</Text>
								<Dropdown 
									data={listaEquipos}
									labelField="label"
									valueField="value"
									placeholder='Selecciona un equipo'
									style={styles.dropdown1DropdownStyle2}
									containerStyle={styles.dropdown2}
									search={true}
									onChange={({ value }) => {
										setFieldValue('equipoVisitante', value);
										setEquipoVisitante(value)
										setLimpiarJugadoresLocales(!limpiarJugadoresLocales)
									}}
									value={values.equipoVisitante}
								/>
								<Text style={styles.error}>{touched.equipoVisitante && errors.equipoVisitante}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Jugadores visitantes</Text>
								<MultiSelect 
									data={listaVisitantes}
									labelField="label"
									valueField="value"
									placeholder='Selecciona un equipo'
									style={styles.dropdown1DropdownStyle2}
									containerStyle={styles.dropdown2}
									search={true}
									onChange={({ value }) => {
										setFieldValue('jugadoresVisitantes', value);
										setJugadoresVisitantes(value)
									}}
									value={values.jugadoresVisitantes}
								/>
								<Text style={styles.error}>{touched.equipoLocal && errors.equipoLocal}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Director técnico local</Text>
								<TextInput
									placeholder='Jorge Alejandro'
									style={styles.txt}
									multiline={true}
									onChangeText={handleChange('dtLocal')}
									value={values.dtLocal}
								/>
								<Text style={styles.error}>{touched.dtLocal && errors.dtLocal}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Director técnico visitante</Text>
								<TextInput
									placeholder='Jorge Bernal'
									style={styles.txt}
									multiline={true}
									onChangeText={handleChange('dtVisitante')}
									value={values.dtVisitante}
								/>
								<Text style={styles.error}>{touched.dtVisitante && errors.dtVisitante}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Puntos equipo local</Text>
								<TextInput
									style={styles.txtNum}
									keyboardType="numeric"
									onChangeText={handleChange('puntosLocal')}
									value={values.puntosLocal}
								/>
								<Text style={styles.error}>{touched.puntosLocal && errors.puntosLocal}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Puntos equipo visitante</Text>
								<TextInput
									style={styles.txtNum}
									keyboardType="numeric"
									onChangeText={handleChange('puntosVisitante')}
									value={values.puntosVisitante}
								/>
								<Text style={styles.error}>{touched.puntosVisitante && errors.puntosVisitante}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Cancha</Text>
								<Dropdown 
									data={facultitiesItems}
									labelField="label"
									valueField="value"
									placeholder='Selecciona una facultad'
									style={styles.dropdown1DropdownStyle2}
									containerStyle={styles.dropdown2}
									search={true}
									onChange={({ value }) => {
										setFieldValue('cancha', value);
									}}
									value={values.cancha}
								/>
								<Text style={styles.error}>{touched.cancha && errors.cancha}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Jornada</Text>
							<TextInput
									style={styles.txtNum}
									keyboardType="numeric"
									onChangeText={handleChange('jornada')}
									value={values.jornada}
								/>
								<Text style={styles.error}>{touched.jornada && errors.jornada}</Text>
						</View>
						<View style={styles.subtitulo}>
							<Text style={styles.txtTitulo}>Incidentes</Text>
								<TextInput
									placeholder='Ingrese aquí...'
									style={styles.txt}
									multiline={true}
									onChangeText={handleChange('incidentes')}
									value={values.incidentes}
								/>
								<Text style={styles.error}>{touched.incidentes && errors.incidentes}</Text>
						</View>
						<View style={styles.boton}>
							<TouchableCmp onPress={()=>onSubmit()}>
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
	container:{
		backgroundColor:'#FFF',
		height: '95%',
	},
	cartas:{
		marginTop:20,
		borderTopWidth:1,
		borderColor:'#DDDDDD',
		paddingBottom:280
	},
	title:{
		fontSize:35,
		fontWeight:'800',
	},
	titulo:{
		padding:30
	},
	modal:{
        backgroundColor: 'white',
        borderRadius:15,
        paddingVertical:30,
        paddingHorizontal:33
    },
	contentContainer:{
        paddingBottom: 50
    },
	tituloModal:{
        marginBottom:20
    },
	txtTitulo:{
        fontFamily: 'Fredoka-Medium',
        fontSize: 20 / fontScale,
        paddingLeft:3
    },
	titleModal:{
        fontFamily: 'Fredoka-SemiBold',
        fontSize: 30 / fontScale,
        textAlign:'center'
    },
	subtitulo:{
        marginTop:25,
    },
	subtitulo2:{
        marginTop:25,
		flexDirection:'row',
		width:width*.7,
		justifyContent:'space-between'
    },
	txt:{
        fontFamily: 'Fredoka-Light',
        fontSize: 18 / fontScale,
        paddingLeft:3,
        marginVertical:5,
		width:width*.7,
		borderRadius:15,
		borderWidth:1,
		padding:5,
		paddingLeft:10
    },
	txtNum:{
        fontFamily: 'Fredoka-Light',
        fontSize: 18 / fontScale,
        paddingLeft:3,
        marginVertical:5,
		width:width*.2,
		borderRadius:15,
		borderWidth:1,
		padding:5,
		paddingLeft:15
    },
	txt2:{
        fontFamily: 'Fredoka-Light',
        fontSize: 18 / fontScale,
        paddingLeft:3,
        marginVertical:5,
		width:width*.3,
		borderRadius:15,
		borderWidth:1,
		padding:5,
		paddingLeft:10
    },
	txt3:{
        fontFamily: 'Fredoka-Light',
        fontSize: 18 / fontScale,
        paddingLeft:3,
        marginVertical:5,
		width:width*.2,
		borderRadius:15,
		borderWidth:1,
		paddingVertical:5,
		paddingLeft:10
    },
	dropdown1DropdownStyle: {
		fontFamily: 'Fredoka-Light',
		fontSize: 18 / fontScale,
		backgroundColor: '#FFF',
		width:width*.16,
		borderWidth:1,
		borderRadius:15,
		height:height*.05,
		paddingLeft:10
	},
	dropdown1: {
		fontFamily: 'Fredoka-Light',
		fontSize: 18 / fontScale,
		backgroundColor: '#FFF',
		width:width*.16,
		borderWidth:1,
		borderRadius:15,
		marginTop:-1.5
	},
	dropdown1DropdownStyle2: {
		fontFamily: 'Fredoka-Light',
		fontSize: 18 / fontScale,
		width:width*.7,
		borderWidth:1,
		borderRadius:15,
		height:height*.05,
		paddingLeft:10,
		backgroundColor: '#FFF',
		marginTop:-1.5
	},
	dropdown2: {
		fontFamily: 'Fredoka-Light',
		fontSize: 18 / fontScale,
		width:width*.7,
		borderWidth:1,
		borderRadius:15,
		backgroundColor: '#FFF',
		marginTop:-1.5
	},
	btn:{
        paddingVertical:8,
        width:width*.4,
        borderRadius:15,
        backgroundColor:'#003070',
    },
    txtBtn:{
        fontFamily: 'Fredoka-Regular',
        fontSize: 17 / fontScale,
        color:'white',
        textAlign:'center'
    },
	boton:{
        marginTop:20,
        alignItems:'flex-end',
        overflow:'hidden'
    },
	error:{
		fontFamily:'Fredoka-Light',
		color: '#BA1200',
	},
})