import * as actions from "Actions"
import { take, put } from "redux-saga/effects"

export default function forgotPassword(api) {
  return function*() {
    while (true) {
      yield take(actions.types.FORGOT_PASSWORD_SUBMIT)

      yield put(actions.forgotPassword.forgotPassswordLoading())

      let ans = yield api.users.forgotPassword()

      yield put(actions.forgotPassword.forgotPassswordFinish())

      if (ans.error) {
        yield put(actions.app.notificationShow(ans.error, "error"))
      } else {
        yield put(
          actions.app.notificationShow(
            "We have emailed your password reset link.",
            "success",
          ),
        )
      }
    }
  }
}