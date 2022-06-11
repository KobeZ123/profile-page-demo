
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, RootState } from '../App';
const { changeBio, changeName, changeUsername } = require('../ProfileActions');

import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');


function widthSmaller() {
    if (width < height) {
      return true;
    }
    return false;
}


type ProfileInfo = {
    setPage: Function,
}


function EditProfilePage() {
    const dispatch = useDispatch();
    const profileName: string = useSelector((state: RootState) => state.name);
    const profileUsername: string = useSelector((state: RootState) => state.username);
    const profileBio: string = useSelector((state: RootState) => state.bio);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <ProfilePictureComponent/>
            <FieldComponent title='NAME' input={profileName} change={changeName} error_check={checkName} error_text='Invalid character in name'/>
            <FieldComponent title='USERNAME' input={profileUsername} change={changeUsername} error_check={checkUsername} error_text='Invalid character in username'/>
            <View style={styles.field_input_container}>
                <Text style={styles.field_label}>
                    BIO
                </Text>
                <TextInput style={[styles.field_input, {height: 50}]} 
                multiline={true} value={profileBio} spellCheck={false}
                onChangeText={(input) => {dispatch(changeBio(input));}}/>
            </View>
            <Pressable style={styles.back_button} onPress={() => {navigation.navigate('ProfilePage');}}>
                <Text style={styles.back_button_text}>
                    BACK
                </Text>
            </Pressable>
        </View>
    );
}


// editing profile picture component 
function ProfilePictureComponent() {
    return (
        <View style={styles.profile_pic_container}>
            <Image style={widthSmaller() ? styles.profile_picture_width : styles.profile_picture_height} source={require('../assets/timothy-green.jpg')}/>
            <Pressable style={widthSmaller() ? styles.change_profile_pic_button_width : styles.change_profile_pic_button_height}
                onPress={()=>{console.log('change photo');}}>
                <Text style={styles.change_profile_pic_text}>
                    CHANGE PHOTO
                </Text>
            </Pressable>
        </View>
    );
}

// field props type
type FieldProps = {
    title: string, 
    input: string,
    change: any, 
    error_check: Function,
    error_text: string
}

// changing field component 
function FieldComponent(props: FieldProps) {
    const dispatch = useDispatch();
    const [field, setField] = useState(props.input);
    return (
        <View style={styles.field_main_container}>
            <View style={styles.field_input_container}>
                <Text style={styles.field_label}>
                    {props.title}
                </Text>
                <TextInput style={styles.field_input}
                    value={field} spellCheck={false} 
                    onChangeText={(input) => {setField(input);
                        if (!props.error_check(props.input)) {dispatch(props.change(input));}}} />
            </View>
            <ErrorTextComponent input={field} error_check={props.error_check} error_text={props.error_text} />
        </View>
        
    );
}

// error props type 
type ErrorTextProps = {
    input: string,
    error_check: Function,
    error_text: string
}

function ErrorTextComponent(props: ErrorTextProps) {
    if (!props.error_check(props.input)) {
        return (
            <Text style={styles.error_text}>{props.error_text}</Text>
        )
    }
    return null;
}

// checks if name is only letters and spaces 
function checkName(str: string) {
    return /^[A-Za-z\s]*$/.test(str);
}

function checkUsername(str: string) {
    return /^[A-Za-z\s_]*$/.test(str);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profile_pic_container: {
        alignItems: 'center',
    },
    profile_picture_width: {
        width: width * 2 / 5,
        aspectRatio: 1,
        borderRadius: width / 4,
        borderWidth: 5,
        borderColor: '#00FF00',
        margin: 10,
    },
    profile_picture_height: {
        height: height * 1 / 5,
        aspectRatio: 1,
        borderRadius: width / 4,
        borderWidth: 5,
        borderColor: '#00FF00',
        margin: 10,
    },
    change_profile_pic_button_width: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        width: width * 2 / 5,
        aspectRatio: 1,
        borderRadius: width / 4,
        borderWidth: 5,
        borderColor: '#00FF00',
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(80, 80, 80, 0.6)',
    },
    change_profile_pic_button_height: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        height: height * 1 / 5,
        aspectRatio: 1,
        borderRadius: width / 4,
        borderWidth: 5,
        borderColor: '#00FF00',
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(80, 80, 80, 0.6)',
    },
    change_profile_pic_text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    field_main_container: {
        alignItems: 'center',
    },
    field_input_container: {
        flexDirection: 'row',
        width: width * 3 / 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    field_label: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10,
    },
    field_input: {
        flex: 3,
        backgroundColor: '#D3D3D3',
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    back_button: {
        borderWidth: 3,
        borderColor: '#000000',
        width: width * 3 / 5
    },
    back_button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: 'center',
    },
    error_text: {
        fontSize: 15,
        color: '#FF0000',
    }
});

export default EditProfilePage;