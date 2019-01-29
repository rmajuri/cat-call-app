import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Google } from 'expo'

import { fs } from './fire'
import { iosClientId, androidClientId } from './secrets'

export default class App extends React.Component {
  originalState = { user: null }
  state = { ...this.originalState }

  signIn = async () => {
    try {
      const { user, type } = await Google.logInAsync({
        androidClientId,
        iosClientId,
        scopes: ['profile', 'email'],
      })
      if (type === 'success') {
        this.setState({ user })
        fs.collection('messages')
          .doc('tester')
          .set({ testing: true }, { merge: true })
      }
    } catch (e) {
      console.log(e)
    }
  }

  signOut = () => this.setState(this.originalState)

  render = () => {
    const { user } = this.state
    if (!user) {
      return (
        <View style={styles.container}>
          <Text>Please sign in with...</Text>
          <Button
            onPress={this.signIn}
            title="Google"
            color="#841584"
            accessibilityLabel="etc..."
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Hey there: {user.name}</Text>
          <Image
            source={{ uri: user.photoUrl }}
            style={{ width: 400, height: 400 }}
          />
          <Button
            onPress={this.signOut}
            title="Sign Out"
            color="#841584"
            accessibilityLabel="etc..."
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
