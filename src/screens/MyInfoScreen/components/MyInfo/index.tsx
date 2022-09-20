import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { Colors, FontFamily } from '../../../../Constants'
import { IMyInfo } from './types'

const MyInfo: IMyInfo = ({ isEditing, title, data, onChangeText }) => {
  return isEditing ? (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput
        style={styles.textInput}
        value={data}
        onChangeText={onChangeText}
      />
    </>
  ) : (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.data}>{data}</Text>
    </>
  )
}

export default MyInfo

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    marginTop: 5,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    textAlignVertical: 'center',
    color: Colors.black,
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.lightGray,
  },
  title: {
    marginTop: 40,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
  },
  data: {
    height: 30,
    marginTop: 5,
    textAlignVertical: 'center',
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
    borderBottomWidth: 1,
    borderColor: Colors.gray3,
  },
})
