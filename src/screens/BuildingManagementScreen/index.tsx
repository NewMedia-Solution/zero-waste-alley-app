import React, { useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Colors, FontFamily } from '../../Constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationService } from '../../services/NavigationService'
import { ROUTE_NAMES } from '../../RouteNames'
import { useDispatch, useSelector } from 'react-redux'
import { requestBuildingList } from '../../redux/modules/Admin'
import {
  BuildingInfo,
  BuildingList,
} from '../../redux/modules/Admin/stateTypes'
import { AppState } from '../../redux/modules/ReduxModuleTypes'

const BuildingManagementScreen = () => {
  const dispatch: any = useDispatch()

  const buildingList = useSelector<AppState, BuildingList>(
    (state) => state.Admin.buildingList
  )

  useEffect(() => {
    dispatch(requestBuildingList())
  }, [])

  const onPress = (id: string) => () => {
    NavigationService.navigate(ROUTE_NAMES.RESIDENT_MANAGEMENT_SCREEN, {
      buildingId: id,
    })
  }

  const renderItem = ({ item }: { item: BuildingInfo }) => (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress(item.buildingId)}
    >
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.address}</Text>
          <Text style={styles.item}>{item.detailAddress}</Text>
        </View>
        <MaterialCommunityIcons
          name={'chevron-right'}
          size={28}
          color={Colors.gray4}
        />
      </>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList data={buildingList} renderItem={renderItem} />
    </View>
  )
}

export default BuildingManagementScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.gray2,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  item: {
    marginRight: 5,
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.black,
  },
})
