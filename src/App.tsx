import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState }  from 'react'

import {setupPlayer, addTrack } from '../musicPlayerService'
import MusicPlayer from './screens/MusicPlayer'

export default function App() {

  const [isPlayerReady, setIsPlayerReady] = useState(false)

  async function setup(){
    let isSetUp = await setupPlayer()

    if(isSetUp){
      await addTrack();
    }

    setIsPlayerReady(isSetUp)
  }


  useEffect(() => {
   setup() 
  }, [])

  if(!isPlayerReady){
    return(
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <MusicPlayer/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})