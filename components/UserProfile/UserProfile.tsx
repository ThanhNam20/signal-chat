import { Input } from 'native-base'
import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import styles from './UserProfile.style'

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarUser}>
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
          }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </View>

      <View style={styles.userProfileInputData}>
        <View style={styles.profileItem}>
          <Text>
            Thanh Nam
          </Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>
            Thanh Nam
          </Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>
            Thanh Nam
          </Text>
          <TextInput style={styles.profileItemInput} />
        </View>

        <View style={styles.profileItem}>
          <Text>
            Thanh Nam
          </Text>
          <TextInput style={styles.profileItemInput} />
        </View>
      </View>

      <View style={styles.userProfileInputData}>
        <View style={styles.profileItem}>
          <Text>
            Logout
          </Text>
        </View>
      </View>

    </View>
  )
}


export default UserProfile;
