import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import { IDefaultPopup } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { hidePopup } from '../../../redux/modules/Modal'
import { appScreen, Colors, FontFamily } from '../../../Constants'

export const DefaultPopup: IDefaultPopup = ({ title, content }) => {
  const dispatch = useDispatch()

  const isShowing = useSelector<any>(
    (state) => state.Modal.isShowingDefaultPopup
  )

  const onPressButton = () => {
    dispatch(hidePopup())
  }

  return (
    <Modal
      animationIn={'slideInUp'}
      animationInTiming={200}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      isVisible={isShowing as boolean}
      backdropColor={'black'}
    >
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.content}>{content}</Text>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={onPressButton}
          underlayColor={Colors.gray}
        >
          <Text style={styles.buttonText}>닫기</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: appScreen.width - 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  title: {
    marginTop: 15,
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.black,
  },
  content: {
    marginTop: 15,
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.black,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.gray4,
  },
})
