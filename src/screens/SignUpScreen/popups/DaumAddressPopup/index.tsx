import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Postcode from '@actbase/react-daum-postcode'
import { appScreen } from '../../../../Constants'
import Modal from 'react-native-modal'
import { IDaumAddressPopup } from './types'

export const DaumAddressPopup: IDaumAddressPopup = ({
  isVisible,
  setAddress,
  setZoneCode,
  hidePopup,
}) => {
  const onSelected = (data: any) => {
    setAddress(data.address)
    setZoneCode(data.zonecode)

    hidePopup()
  }

  return (
    <Modal
      animationIn={'slideInUp'}
      animationInTiming={200}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      isVisible={isVisible}
      backdropColor={'black'}
      onBackdropPress={hidePopup}
    >
      <ScrollView style={styles.container}>
        <Postcode
          style={styles.postCode}
          onSelected={onSelected}
          onError={hidePopup}
        />
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: appScreen.width - 40,
    borderRadius: 5,
  },
  postCode: {
    width: appScreen.width - 60,
    height: appScreen.height - 200,
    alignSelf: 'center',
  },
})
