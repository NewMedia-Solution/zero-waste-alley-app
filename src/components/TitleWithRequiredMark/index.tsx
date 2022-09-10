import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, FontFamily } from '../../Constants'
import { ITitleWithRequiredMark } from './types'

export const TitleWithRequiredMark: ITitleWithRequiredMark = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.requiredMark}> *</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 40,
  },
  title: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
  },
  requiredMark: {
    marginTop: -3,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.red,
  },
})
