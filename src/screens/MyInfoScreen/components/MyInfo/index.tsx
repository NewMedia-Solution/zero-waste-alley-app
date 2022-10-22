import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { Colors, FontFamily } from '../../../../Constants'
import { IMyInfo } from './types'

const MyInfo: IMyInfo = ({
  isEditing,
  title,
  data,
  secureTextEntry = false,
  onChangeText,
  onPressButton,
}) => {
  return isEditing ? (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput
        style={styles.textInput}
        value={data ?? ''}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </>
  ) : (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.dataContainer}>
        <Text style={styles.data}>{data}</Text>
        {onPressButton && (
          <TouchableHighlight
            style={[styles.button, { backgroundColor: Colors.blue }]}
            underlayColor={Colors.blue2}
            onPress={onPressButton}
          >
            <Text style={styles.buttonText}>주소 검색</Text>
          </TouchableHighlight>
        )}
      </View>
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
  dataContainer: {
    flexDirection: 'row',
  },
  data: {
    flex: 1,
    height: 30,
    marginTop: 5,
    textAlignVertical: 'center',
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
    borderBottomWidth: 1,
    borderColor: Colors.gray3,
  },
  button: {
    marginLeft: 10,
    marginTop: 5,
    padding: 7,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.white,
  },
})
