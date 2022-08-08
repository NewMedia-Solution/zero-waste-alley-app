import { StackActions } from '@react-navigation/native'

export class NavigationiService {
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
}
