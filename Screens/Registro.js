import React, { useState } from 'react';
import {
	Alert,
	ActivityIndicator,
	Dimensions,
	Modal,
	Platform,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Switch,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
	Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from "yup";
import { aFacultities, expRegex, insuranceRegex, nameRegex, phoneRegex } from '../Utils/Constants';
import { Header } from '../components';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from '../assetsUI/TouchableCmp';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { process, SAVE_WITH_FILE } from '../Service/Api';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');     

const logoINDEREQ = require('../images/logo.png');



const sexo = ["Masculino", "Femenino"];

const filePickerText = "Subir archivo";

// ? Testing purposes, check later how to manage this
const aSports = [
	{
		label: 'Futbol',
		value: 'Futbol',
	},
	{
		label: 'Basquetball',
		value: 'Basquetball',
	},
	{
		label: 'Volleyball',
		value: 'Volleyball',
	},
	{
		label: 'Atletismo',
		value: 'Atletismo',
	},
];

const oInitialState = {
	expediente: '',
	nombres: '',
	apellidos: '',
	sexo: '',
	facultad: '',
	jugadorSeleccionado: false,
	numSeguroSocial: '',
	numJugador: '',
	deporte: '',
	correo: '',
	telefono: '',
	telefonoEmergencia: '',
	fotoCardex: null,
	fotoIdentificacionOficial: null,
	foto: null,
};

const validationSchema = yup.object().shape({
	expediente: yup
		.string()
		.required('El expediente es requerido')
		.matches(expRegex, 'El expediente debe ser de almenos 6 digitos'),
	nombres: yup
		.string()
		.required('El nombre es requerido')
		.matches(nameRegex, 'Formato de nombre incorrecto'),
	apellidos: yup
		.string()
		.required('Los apellidos son requeridos')
		.matches(nameRegex, 'Formato de apellidos incorrecto'),
	sexo: yup
		.string()
		.required('El sexo es requerido'),
	facultad: yup
		.string()
		.required('La facultad es requerida'),
	jugadorSeleccionado: yup
		.boolean()
		.default(false),
	numSeguroSocial: yup
		.string()
		.required('El numero de seguro social es requerido')
		.matches(insuranceRegex, 'El numero de seguro social debe ser de 11 digitos'),
	numJugador: yup
		.number()
		.integer('Debe ser un número entero'),
	deporte: yup
		.string()
		.required('El deporte es requerido'),
	correo: yup
		.string()
		.email('El correo no es valido')
		.required('El correo es requerido'),
	telefono: yup
		.string()
		.required('El telefono es requerido')
		.matches(phoneRegex, 'El telefono debe ser de 10 digitos'),
	telefonoEmergencia: yup
		.string()
		.required('El telefono de emergencia es requerido')
		.matches(phoneRegex, 'El telefono de emergencia debe ser de 10 digitos'),
	fotoCardex: yup
		.mixed()
		.required('El Kardex es requerido'),
	fotoIdentificacionOficial: yup
		.mixed()
		.required('La foto de tu Identificación Oficial es requerida'),
	foto: yup
		.mixed()
		.required('La foto es requerida'),
});

export const Registro = () => {
	const [kardex, setKardex] = useState(filePickerText);
	const [identificacion, setIdentificacion] = useState(filePickerText);
	const [foto, setFoto] = useState(filePickerText);
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [modBot, setModBot] = useState('');
	const navigation = useNavigation();
	const [showModal, setShowModal] = useState(false);
	const [deportistaData,setDeportistaData] = useState({
        nombre:"",
        apellidoM:"",
        apellidoP:"",
        idPropio:""
    })

	const facultitiesItems = aFacultities.map(oFaculty => ({
		label: `Facultad de ${oFaculty}`,
		value: oFaculty,
	}));

	const sexoItems = sexo.map(oSexo => ({
		label: oSexo,
		value: oSexo === 'Masculino' ? 0 : 1,
	}));

	const oSetter = {
		'fotoCardex': setKardex,
		'fotoIdentificacionOficial': setIdentificacion,
		'foto': setFoto,
	};

	const pickFile = async (type, formHandler) => {
		// No permissions request is necessary for launching the image library
		let result = await DocumentPicker.getDocumentAsync({
			type: ['application/pdf','image/*'],
			copyToCacheDirectory: true,
			multiple:false,
		});
  
		console.log(result);
  
		if (result.type=='success') {
				oSetter[type](result.name);
				formHandler(type, result);
				setModBot('');
				setModal(false);
		}
	};
	const takePhoto = async (type, formHandler) => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality:0.5
		});

		if (!result.cancelled) {
			const uri = result.uri.split("/");
			oSetter[type](uri[uri.length-1]);
			formHandler(type, result);
			setModBot('');
			setModal(false);
		}
	};

	const vector = (file) =>{
		if (file === filePickerText)  {
			return (
				<Feather name={'upload'} color={'#003070'} size={13}/>
			)
		}
	};

	const onSubmit = async (values, reset) => {
		setLoading(true);

		const FormData = global.FormData;
		let oSend = new FormData();

		for (const sKey in values) {

			if (['fotoCardex', 'fotoIdentificacionOficial', 'foto'].includes(sKey)) {
				oSend.append(sKey, {
					uri: (Platform.OS === "android") ? values[sKey].uri : values[sKey].replace("file://", ""),
					name: values[sKey].name,
					type: values[sKey].mimeType,
				});
			} else {
				oSend.append(sKey, values[sKey]);
			}
		}

		const response = await process(SAVE_WITH_FILE, 'deportistas', oSend);

		if (response?.data?.ok) {
			Alert.alert(
				'Jugador agregado exitosamente',
				response.data.message,
				[
					{
						text:'Okay',
						onPress: () => setShowModal(!showModal)
					},
				]
			);

			const { nombres: nombre, apellidos, deportistaId: idPropio } = response.data?.data;
            const [apellidoP, apellidoM] = apellidos.split(" ");
            setDeportistaData({
                nombre,
                apellidoP,
                apellidoM,
                idPropio,
            })
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

		setLoading(false);
	};

	return(
		<ScrollView style={styles.general} showsVerticalScrollIndicator={false}>
		<SafeAreaView style={{backgroundColor: "#003070"}}/>
			<Header navigation={navigation} title={"Registrar Deportista"}/>
			<View style={styles.center}>

				{/* FORM FIELDS */}
				<View style={styles.viewForm}>

				<Formik
					initialValues={oInitialState}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						const reset = () => {
							resetForm();
							for (const [, fn] of Object.entries(oSetter)) {
								fn(filePickerText);
							}
						};

						onSubmit(values, reset);
					}}
				>
				{({ setFieldValue, handleChange, handleSubmit, values, errors, touched }) => (
					<>
						<Text style={styles.campos}>Expediente:</Text>
						<TextInput
							placeholder='123456'
							style={styles.input}
							keyboardType='number-pad'
							onChangeText={handleChange('expediente')}
							value={values.expediente}
						/>
						<Text style={styles.error}>{touched.expediente && errors.expediente}</Text>

						<Text style={styles.campos}>Nombre(s):</Text>
						<TextInput
							placeholder='Jorge Alejandro'
							style={styles.input}
							onChangeText={handleChange('nombres')}
							value={values.nombres}
						/>
						<Text style={styles.error}>{touched.nombres && errors.nombres}</Text>

						<Text style={styles.campos}>Apellidos:</Text>
						<TextInput
							placeholder='Bernal Colín'
							style={styles.input}
							onChangeText={handleChange('apellidos')}
							value={values.apellidos}
						/>
						<Text style={styles.error}>{touched.apellidos && errors.apellidos}</Text>

						{/* DROPDOWNS----------------------------------------------------------------------------------------------------- */}
						<Text style={styles.campos}>Sexo:</Text>
						<Dropdown 
							data={sexoItems}
							labelField="label"
							valueField="value"
							placeholder='Seleccione una opción'
							style={styles.dropdown1DropdownStyle}
							containerStyle={styles.dropdown1DropdownStyle}
							onChange={({ value }) => {
								setFieldValue('sexo', value);
							}}
							value={values.sexo}
						/>
						<Text style={styles.error}>{touched.sexo && errors.sexo}</Text>

						<Text style={styles.campos}>Facultad:</Text>
						<Dropdown 
							data={facultitiesItems}
							labelField="label"
							valueField="value"
							placeholder='Selecciona una facultad'
							style={styles.dropdown1DropdownStyle}
							containerStyle={styles.dropdown1DropdownStyle}
							onChange={({ value }) => {
								setFieldValue('facultad', value);
							}}
							value={values.facultad}
							search={true}
						/>
						<Text style={styles.error}>{touched.facultad && errors.facultad}</Text>

						<Text style={styles.campos}>¿Eres jugador seleccionado?</Text>
						<View style={styles.switch}>
							<View style={styles.switch2}> 
								<Text style={{fontFamily:'Fredoka-Light'}}>No</Text>
							</View>
							<Switch 
								trackColor={{ false: "#DBDBDB", true: "#CFDBD5" }}
								thumbColor={values.jugadorSeleccionado ? "#09418C" : "#767577"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={v => {
									setFieldValue('jugadorSeleccionado', Number(v));
								}}
								value={!!values.jugadorSeleccionado}
							/>
							<View style={styles.switch2}> 
								<Text style={{fontFamily:'Fredoka-Light'}}>Si</Text>
							</View>
						</View>
						{/* -------------------------------------------------------------------------------------------------------------- */}

						<Text style={styles.campos}>No. Jugador:</Text>
						<TextInput
							placeholder='7'
							style={styles.input}
							keyboardType='numeric'
							onChangeText={handleChange('numJugador')}
							value={values.numJugador}
						/>
						<Text style={styles.error}>{touched.numJugador && errors.numJugador}</Text>

						<Text style={styles.campos}>Deporte:</Text>
						<Dropdown 
							data={aSports}
							labelField="label"
							valueField="value"
							placeholder='Seleccione una opción'
							style={styles.dropdown1DropdownStyle}
							containerStyle={styles.dropdown1DropdownStyle}
							onChange={({ value }) => {
								setFieldValue('deporte', value);
							}}
							value={values.deporte}
						/>
						<Text style={styles.error}>{touched.deporte && errors.deporte}</Text>

						<Text style={styles.campos}>No. Seguro Social:</Text>
						<TextInput
							placeholder='12345678912'
							style={styles.input}
							keyboardType='numeric'
							onChangeText={handleChange('numSeguroSocial')}
							value={values.numSeguroSocial}
						/>
						<Text style={styles.error}>{touched.numSeguroSocial && errors.numSeguroSocial}</Text>

						<Text style={styles.campos}>Correo electrónico:</Text>
						<TextInput
							placeholder='sample@mail.com'
							style={styles.input}
							keyboardType='email-address'
							onChangeText={handleChange('correo')}
							value={values.correo}
						/>
						<Text style={styles.error}>{touched.correo && errors.correo}</Text>

						<Text style={styles.campos}>Teléfono:</Text>
						<TextInput
							placeholder='442-123-4567'
							style={styles.input}
							keyboardType='phone-pad'
							onChangeText={handleChange('telefono')}
							value={values.telefono}
						/>
						<Text style={styles.error}>{touched.telefono && errors.telefono}</Text>

						<Text style={styles.campos}>Teléfono de emergencias:</Text>
						<TextInput
							placeholder='442-123-1212'
							style={styles.input}
							keyboardType='phone-pad'
							onChangeText={handleChange('telefonoEmergencia')}
							value={values.telefonoEmergencia}
						/>
						<Text style={styles.error}>{touched.telefonoEmergencia && errors.telefonoEmergencia}</Text>


						{/* FILES -------------------------------------------------------------------------------------------------------- */}
						<Text style={styles.campos2}>Kárdex:</Text>
						<View style={styles.subir}>
							<View style={kardex === filePickerText ? styles.viewTouch : styles.viewTouchCon}>
								<TouchableCmp onPress={()=>{
									setModal(true);
									setModBot('fotoCardex');
								}}>
									<View style={kardex === filePickerText ? styles.viewTouch2 : styles.viewTouch2Con}>
										<View style={kardex === filePickerText?styles.viewTouch3 : styles.viewTouch3Con}>
											{vector(kardex)}
											<Text
												numberOfLines={1}
												style={kardex === filePickerText ? styles.touch : styles.touchCon}
											>
												{ kardex === filePickerText ? filePickerText : kardex}
											</Text>	
										</View>
									</View>
								</TouchableCmp>
							</View>
						</View>
						<Text style={styles.error}>{touched.fotoCardex && errors.fotoCardex}</Text>

						<Text style={styles.campos}>Identificación oficial:</Text>
						<View style={styles.subir}>
							<View style={identificacion === filePickerText ? styles.viewTouch : styles.viewTouchCon}>
								<TouchableCmp onPress={() => {
									setModal(true);
									setModBot('fotoIdentificacionOficial');
								}}>
									<View style={identificacion === filePickerText ? styles.viewTouch2 : styles.viewTouch2Con}>
										<View style={identificacion === filePickerText ? styles.viewTouch3 : styles.viewTouch3Con}>
											{vector(identificacion)}
											<Text
												numberOfLines={1}
												style={identificacion === filePickerText ? styles.touch : styles.touchCon}
											>
												{identificacion === filePickerText ? filePickerText : identificacion}
											</Text>	
										</View>
									</View>
								</TouchableCmp>
							</View>
						</View>
						<Text style={styles.error}>{touched.fotoIdentificacionOficial && errors.fotoIdentificacionOficial}</Text>

						<Text style={styles.campos}>Foto del deportista:</Text>
						<View style={styles.subir}>
							<View style={foto === filePickerText ? styles.viewTouch : styles.viewTouchCon}>
								<TouchableCmp onPress={() => {
									setModal(true);
									setModBot('foto');
								}}>
									<View style={foto === filePickerText ? styles.viewTouch2 : styles.viewTouch2Con}>
										<View style={foto === filePickerText ? styles.viewTouch3 : styles.viewTouch3Con}>
											{vector(foto)}
											<Text
												numberOfLines={1}
												style={foto === filePickerText ? styles.touch : styles.touchCon}
											>
												{foto === filePickerText ? filePickerText : foto}
											</Text>	
										</View>
									</View>
								</TouchableCmp>
							</View>
						</View>
						<Text style={styles.error}>{touched.foto && errors.foto}</Text>
						{/* -------------------------------------------------------------------------------------------------------------- */}


						<View style={styles.viewButton}>
							<TouchableCmp onPress={handleSubmit}>
								<View style={styles.viewRegistrar}>
									{loading ? <ActivityIndicator color="white"/> : <Text style={styles.registrar}>Registrar deportista</Text>}
								</View>
							</TouchableCmp>
						</View>

						<Modal
							animationType={'slide'}
							visible={modal}
							transparent
							onRequestClose={() => setModal(false)}
							>
							<TouchableWithoutFeedback onPress={() => setModal(false) }>
								<View style={styles.notModal}></View>
							</TouchableWithoutFeedback>
							<View style={styles.modal}>
								<View style={styles.modalTitle}>
									<Text style={styles.modalTextT}>Elija una opción</Text>
								</View>
								<View style={styles.modalBotones}>
									<TouchableCmp
										onPress={() => {
											takePhoto(modBot, setFieldValue);
										}}
									>
										<View style={styles.modalOp1}>
											<Text style={styles.modalText}>Tomar foto</Text>
										</View>
									</TouchableCmp>
									<TouchableCmp
										onPress={() => {
											pickFile(modBot, setFieldValue);
										}}
									>
										<View style={styles.modalOp1}>
											<Text style={styles.modalText}>Seleccionar archivo</Text>
										</View>
									</TouchableCmp>
								</View>
							</View>
						</Modal>
						
						<Modal
							animationType="slide"
							transparent={false}
							visible={showModal}
							onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							setModalVisible(!modalVisible);
							}}>
							<View style={styles.containerModalQR}>
								<View style={styles.headerIndereq}>
									<Image source={require('../images/logoIndereqText.png')}/>
								</View>
								<View>
									<Text style={{...styles.componentText, fontWeight: "bold", fontSize: 30}}>QR Generado</Text>
									<Text style={styles.componentText}>Los datos han sido guardados exitosamente</Text>
								</View>
								<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
									<QRCode
										value={`${JSON.stringify(deportistaData)}`}
										size={Dimensions.get('window').width*0.7}
									/>
									<Image 
										source={require('../images/logo.png')} 
										style={{width: 70, height: 70, position: 'absolute'}}
									/>
								</View>
								<Text style={styles.componentText}>No olvides escanear el código QR</Text>
								<TouchableCmp onPress={() => setShowModal(!showModal)}>
									<View style={styles.viewButtonCerrar}>
										<Text style={{color: 'white'}}>Cerrar</Text>
									</View>
								</TouchableCmp>
							</View>
						</Modal>
						
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
		fontFamily:'Fredoka-Medium',
	},
	viewForm:{
		width:width/1.25,
		marginTop:height/28,
	},
	campos:{
		fontFamily:'Fredoka-Light',
		marginTop:15
	},
	campos2:{
		fontFamily:'Fredoka-Light',
		marginTop:30,
	},
	input:{
		width:width/1.25,
		paddingLeft:5,
		borderBottomWidth:1,
		borderBottomColor:'black',
		fontFamily:'Fredoka-Light',
	},
	dropdown1DropdownStyle: {
		backgroundColor: '#FFF',
		marginTop:-1.5
	},
	touch:{
		fontSize:14,
		fontFamily:'Fredoka-Medium',
		color:'#003070',
	},
	touchCon:{
		fontSize:14,
		fontFamily:'Fredoka-Medium',
		color:'white',
	},
	viewTouch:{
		marginTop:7,
		width:'100%',
		height:height/21,
		borderRadius:10,
		borderColor:'#003070',
		borderWidth:1,
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		marginBottom:15,
	},
	viewTouchCon:{
		marginTop:7,
		width:'100%',
		height:height/21,
		borderRadius:10,
		borderColor:'#198754',
		borderWidth:1,
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		marginBottom:15,
		backgroundColor:'5cb85c'
	},
	viewTouch2:{
		width:width/1.2,
		height:height/21,
		borderRadius:10,
		borderColor:'#003070',
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		backgroundColor:'white',
	},
	viewTouch2Con:{
		width:width/1.2,
		height:height/21,
		borderRadius:10,
		borderColor:'#198754',
		alignItems:'center',
		justifyContent:'center',
		overflow:'hidden',
		backgroundColor:'#5cb85c'
	},
	viewTouch3:{
		width:width/3,
		flexDirection:'row',
		justifyContent:'center',
		justifyContent:'space-around',
	},
	viewTouch3Con:{
		width:'80%',
		flexDirection:'row',
		justifyContent:'center',
		justifyContent:'space-around',
	},
	subir:{
		flexDirection:'row',
		justifyContent:'center',
		justifyContent:'space-between'
	},
	registrar:{
		fontFamily:'Fredoka-Regular',
		fontSize:16,
		color:'white',
		textAlign:'center',
	},
	viewRegistrar:{
		width:width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		overflow:'hidden',
	},
	viewButton:{
		backgroundColor:'red',
		width:width/1.25,
		height:55,
		borderRadius:10,
		backgroundColor:'#003070',
		justifyContent:'center',
		marginTop:40,
		marginBottom:30,
		overflow:'hidden',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
		backgroundColor:'red',
	},
	switch:{
		flexDirection:'row',
		justifyContent:'space-evenly',
		paddingRight:200,
		height:28.5,
		marginTop:3,
	},
	switch2:{
		justifyContent:'center',
	},
	error:{
		fontFamily:'Fredoka-Light',
		color: '#BA1200',
	},
	notModal:{
		height:height*0.84,
	},
	modal:{
		height:height/6,
		backgroundColor:'#003070',
		borderTopLeftRadius:30,
		borderTopRightRadius:30,
		// width:'95%',
		// marginLeft:'2.5%'
	},
	modalBotones:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:30,
	},
	modalOp1:{
		backgroundColor:'white',
		width:width*0.45,
		height:height*0.05,
		justifyContent:'center',
		borderRadius:15
	},
	modalTextT:{
		color:'white',
		fontSize:20,
		fontFamily:'Fredoka-Medium',
		textAlign:'center',
		marginTop:15
	},
	modalText:{
		color:'#003070',
		fontSize:17,
		fontFamily:'Fredoka-Light',
		textAlign:'center',
	},
	containerModalQR: {
		paddingBottom: 50,
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerIndereq: {
		width: '100%',
		height: 80,
		backgroundColor: '#003070',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	componentText: {
		textAlign: 'center',
		marginBottom: 10,
	},
	viewButtonCerrar: {
		backgroundColor: '#003070',
		width: Dimensions.get('window').width*0.65,
		height: Dimensions.get('window').height*0.06,
		borderRadius: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
