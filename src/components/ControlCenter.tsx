import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { playbackService } from '../../musicPlayerService'



export default function ControlCenter() {

  const playBackState = usePlaybackState()

  const skipToNext = async () => {
    await TrackPlayer.skipToNext()
  }

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious()
  }

  const togglePlayBack = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack()

    if (currentTrack != undefined) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }
  }

  // Extract the actual state from playBackState
  const actualState = playBackState.state !== undefined ? playBackState.state : playBackState

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icons style={styles.icon} name='skip-previous' size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayBack(actualState as State)}>
        <Icons
          style={styles.icon}
          name={actualState === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icons style={styles.icon} name='skip-next' 
        size={40} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
})
