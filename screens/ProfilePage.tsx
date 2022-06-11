import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { Dimensions } from 'react-native';

import { useSelector } from 'react-redux';
import { RootStackParamList, RootState } from '../App';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


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


type Props = NativeStackScreenProps<RootStackParamList, 'ProfilePage'>;

function ProfilePage() {

  
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.profile_feed_container}>
        <PostCard image={require('../assets/timothy-green-making-kite.jpg')} caption='My friend Joni Jerome and I are building kites in a field'/>
        <PostCard image={require('../assets/timothy-green-smiling.jpg')} caption='Aww, this portrait photo came out with the most amazing lighting'/>
      </View>
    </View>
  );
}

// profile header
function ProfileHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const profileName: string = useSelector((state: RootState) => state.name);
  const profileUsername: string = useSelector((state: RootState) => state.username);
  const profileBio: string = useSelector((state: RootState) => state.bio);
  return (
    <View style={styles.profile_header}>
      <Image style={widthSmaller() ? styles.profile_picture_width : styles.profile_picture_height} source={require('../assets/timothy-green.jpg')}/>
      <Text style={styles.profile_name}>{profileName}</Text>
      <Text style={styles.profile_username}>{'@' + profileUsername}</Text>
      <Text style={styles.profile_bio}>{profileBio}</Text>
      <Pressable style={styles.edit_profile_button}
        onPress={() => navigation.navigate('EditProfilePage')}>
        <Text style={styles.edit_profile_text}>EDIT PROFILE</Text>
      </Pressable>
    </View>
  );
}

type PostCardProp = {
  image: any,
  caption: string,
}

function PostCard(props: PostCardProp) {
  return ( 
    <View style={styles.post_card_container}>
      <Image style={widthSmaller() ? styles.post_card_image_width : styles.post_card_image_height} source={props.image}/>
      <Text style={widthSmaller() ? styles.post_card_caption_width : styles.post_card_caption_height}>{props.caption}</Text>
    </View>
  );
}



type ChoiceProp = {
  label: string,
  color: string,
  image: any,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
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
  profile_name: {
    fontSize: 25, 
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#000000'
  },
  profile_username: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#808080',
  },
  profile_bio: {
    fontSize: 15,
    fontStyle: 'normal',
    color: '#000000',
    marginVertical: 10, 
    width: '80%',
    textAlign: 'center',
  },
  edit_profile_button: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  edit_profile_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  profile_feed_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  tot_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    borderRadius: 15,
  },
  post_card_container: {
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    borderRadius: 15,
    margin: 15,
    padding: 15,
  },
  post_card_image_width: {
    width: width * 4 / 5,
    aspectRatio: 1,
    borderRadius: 10,
  },
  post_card_image_height: {
    height: height * 4 / 5,
    aspectRatio: 1,
    borderRadius: 10,
  },
  post_card_caption_width: {
    width: width * 4 / 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  post_card_caption_height: {
    width: height * 4 / 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },

});

export default ProfilePage;