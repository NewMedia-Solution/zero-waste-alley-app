import { StackActions } from '@react-navigation/native'

export class NavigationService {
  static _navigation: any

  static init(navigation: any) {
    this._navigation = navigation
  }

  static navigate(routeName: string, params?: { [key: string]: any }) {
    params
      ? this._navigation.navigate(routeName, params)
      : this._navigation.navigate(routeName)
  }

  static popToTop() {
    this._navigation.dispatch(StackActions.popToTop())
  }

  static pop(count: number) {
    this._navigation.dispatch(StackActions.pop(count))
  }
}
