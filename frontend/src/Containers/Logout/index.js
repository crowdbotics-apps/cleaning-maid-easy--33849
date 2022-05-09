import React from "react"
import { useEffect } from "react"

export default function Logout(props) {
    const {history}=props

  useEffect(() => {
    sessionStorage.removeItem("authToken")
    sessionStorage.removeItem("userInfo")
    sessionStorage.removeItem("date")
    history.push("/auth/login")
  }, [])

  return <div></div>
}
