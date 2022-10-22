import React, { useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { Colors, FontFamily } from '../../Constants'
import { RESIDENT_APPROVAL_STATE } from '../../Enums'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/modules/ReduxModuleTypes'
import {
  ResidentInfo,
  ResidentList,
} from '../../redux/modules/Admin/stateTypes'
import { requestResidentList, updateResident } from '../../redux/modules/Admin'
import { useNavigationState } from '@react-navigation/native'

const ResidentManagementScreen = () => {
  const dispatch: any = useDispatch()
  const buildingId = useNavigationState<any, string>(
    (state) => state.routes?.[state.index]?.params?.buildingId
  )

  const residentList = useSelector<AppState, ResidentList>(
    (state) => state.Admin.residentList
  )

  useEffect(() => {
    dispatch(requestResidentList(buildingId))
  }, [])

  const onPress =
    (state: RESIDENT_APPROVAL_STATE, residentId: string) => async () => {
      switch (state) {
        case RESIDENT_APPROVAL_STATE.CONFIRM: {
          const { isApiSuccess } = await dispatch(
            updateResident(
              RESIDENT_APPROVAL_STATE.CONFIRM,
              residentId,
              buildingId
            )
          )

          if (isApiSuccess) {
            dispatch(requestResidentList(buildingId))
          }

          break
        }

        case RESIDENT_APPROVAL_STATE.REMOVE: {
          const { isApiSuccess } = await dispatch(
            updateResident(
              RESIDENT_APPROVAL_STATE.REMOVE,
              residentId,
              buildingId
            )
          )

          if (isApiSuccess) {
            dispatch(requestResidentList(buildingId))
          }

          break
        }
      }
    }

  const renderButton = (state: RESIDENT_APPROVAL_STATE, residentId: string) => {
    switch (state) {
      case RESIDENT_APPROVAL_STATE.WAIT:
        return (
          <TouchableHighlight
            style={styles.approveButton}
            underlayColor={Colors.lightGreen2}
            onPress={onPress(RESIDENT_APPROVAL_STATE.CONFIRM, residentId)}
          >
            <Text style={styles.buttonText}>승인</Text>
          </TouchableHighlight>
        )
      case RESIDENT_APPROVAL_STATE.CONFIRM:
        return (
          <TouchableHighlight
            style={styles.removeButton}
            underlayColor={Colors.red2}
            onPress={onPress(RESIDENT_APPROVAL_STATE.REMOVE, residentId)}
          >
            <Text style={styles.buttonText}>삭제</Text>
          </TouchableHighlight>
        )
    }
  }

  const renderItem = ({ item }: { item: ResidentInfo }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.roomNumber}>{item.roomNumber + '호'}</Text>
      {renderButton(item.approvalState, item.residentId)}
    </View>
  )

  const separatorComponent = () => <View style={styles.separator} />

  return (
    <View style={styles.container}>
      <FlatList
        data={residentList}
        renderItem={renderItem}
        ItemSeparatorComponent={separatorComponent}
      />
    </View>
  )
}

export default ResidentManagementScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  approveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGreen,
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.red,
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  roomNumber: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.black,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.gray2,
  },
})
