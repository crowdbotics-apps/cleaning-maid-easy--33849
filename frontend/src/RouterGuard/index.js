import React from "react"
import { Route, Redirect } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"

const RouteGuard = ({
  isProtected = false,
  component: Component,
  ...rest
}) => {

  const accessToken = sessionStorage.getItem('authToken')
  // const accessToken = false
  return (
    <Route
      {...rest}
      render={props => {
        if (isProtected) {
          return accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/auth/login" }} />
          )
        } else {
          return accessToken ? (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      }}
    />
  )
}

const mapStateToProps = state => ({
  // accessToken: state.signIn.accessToken
  // user: state.login.user,
  // timerRef: state.flightSearch.timerRef
})

// const mapStateToProps = createStructuredSelector({
//     user: makeSelectUser(),
// });

const withConnect = connect(mapStateToProps)

export default compose(withConnect)(RouteGuard)
