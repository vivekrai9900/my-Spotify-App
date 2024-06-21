import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState }  from 'react'

import {setupPlayer, addTrack } from '../musicPlayerService'

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
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})