import React, { useState } from 'react';
import { View, Image } from "react-native";
import { TextInput, Button, Dialog, Portal } from 'react-native-paper';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-modern-datepicker';

import ChooseImage from '../components/ChooseImage';

const UploadPage = () => {
	const [resourcePath, setResourcePath] = useState({});
	const [caption, setCaption] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [time, setTime] = useState('');
	const [showTime, setShowTime] = useState(false);

	const handleUpload = (res) => {
		setResourcePath(res)
		setShowModal(true)
	}

	const handleTime = (time) => {
		setTime(time);
		setShowTime(false);
	};

	const submitDialog = () => {
		// do push api call here

		setResourcePath({});
		setCaption('');
		setShowModal(false);
		setTime('');
		setShowTime(false);
	}

	if (!resourcePath.assets) {
		return <ChooseImage handleUpload={handleUpload} />;
	}

	return (
		<>
			<View>
				<Portal>
					<Dialog style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: "100%"
					}} visible={showModal} dismissable={false}>
						<Dialog.Content>
							<Image
								source={{ uri: resourcePath.assets[0].uri }}
								style={{ width: 200, height: 200 }}
							/>
							<TextInput
								mode="outlined"
								placeholder="Write a caption"
								onChangeText={text => {
									setCaption(text);
								}}
								multiline
								maxLength={50}
								style={{ width: 200 }}
							/>
						</Dialog.Content>
						<Dialog.Actions>
							<Button mode="outlined" onPress={() => {
								setShowTime(true);
							}} style={{ margin: 5 }}>{time || 'Add timer'}</Button>
							<Button mode="contained" icon="upload" onPress={submitDialog}>Upload</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				<Portal>
					<Dialog style={{
						justifyContent: 'center',
						alignItems: 'center',
						width: "75%",
						marginLeft: "12.5%"
					}} visible={showTime} onDismiss={() => { setShowTime(false); }}>
						<Dialog.Content>
							<DatePicker
								options={{
									mainColor: '#7200eb',
								}}
								style={{ width: 200, margin: 0 }}
								mode="time"
								minuteInterval={5}
								onTimeChange={handleTime}
							/>
						</Dialog.Content>

					</Dialog>
				</Portal>
			</View>
			{/* <DateTimePickerModal
				isVisible={showTime}
				mode="time"
				date={time}
				onConfirm={handleTime}
				onCancel={() => { setShowTime(false); }}
				is24Hour
			/> */}
		</>
	)
}

export default UploadPage;
