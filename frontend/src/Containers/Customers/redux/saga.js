import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

import toast from "react-hot-toast"

// utils
import XHR from "../../../utils/XHR"

// types
import {
  GET_ALL_CUSTOMERS,
  ADD_CUSTOMER,
  CHANGE_NOTIFICATION,
  SEARCH_CUSTOMERS,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER
} from "./types"

// actions
import {
  getAllCustomersSuccess,
  getAllCustomers as getAllCustomersData,
  reset,
  addCustomerFailure
} from "./actions"

async function getAllCustomersAPI(index, isTrue) {
  const URL = `${BASE_URL}/api/v1/users/customers_list/${
    isTrue ? "?all=true" : "?page=" + index
  }`

  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "GET"
  }

  return XHR(URL, options)
}

function* getAllCustomers({ index, isTrue }) {
  try {
    const response = yield call(getAllCustomersAPI, index, isTrue)
    yield put(getAllCustomersSuccess(response?.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}

async function addCustomerApi(data) {
  const URL = `${BASE_URL}/api/v1/users/create_customer/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "POST",
    data
  }

  return XHR(URL, options)
}

function* addCustomer({ data, toggle, currentpage }) {
  try {
    const response = yield call(addCustomerApi, data)
    yield put(getAllCustomersData(currentpage))
    toast.success("Successfully saved!")
    toggle()
  } catch (e) {
    const { response } = e
    yield put(addCustomerFailure())
    toast.error(response?.data?.Error? response?.data?.Error : "Someting wrong!")
  }
}

async function changeNotificationApi(data, id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`

  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    },
    method: "PATCH",
    data
  }

  return XHR(URL, options)
}

function* changeNotification({ data, id, currentpage }) {
  try {
    const response = yield call(changeNotificationApi, data, id)
    yield put(getAllCustomersData(currentpage))
    toast.success("Successfully notification changed!")
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  }
}

async function searchCustomersApi(data) {
  const URL = `${BASE_URL}/api/v1/users/customers_list/?q=${data}`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "GET"
  }

  return XHR(URL, options)
}

function* searchCustomers({ data }) {
  try {
    const response = yield call(searchCustomersApi, data)
    yield put(getAllCustomersSuccess(response?.data))
  } catch (e) {
    const { response } = e
  } finally {
    yield put(reset())
  }
}


async function deleteCustomerApi(id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    },
    method: "DELETE"
  }

  return XHR(URL, options)
}

function* deleteCustomer({ id, currentpage }) {
  try {
    const response = yield call(deleteCustomerApi,id)
    yield put(getAllCustomersData(currentpage))
    toast.success("Successfully deleted!")
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  }
}


async function updateCustomerApi(data,id) {
  const URL = `${BASE_URL}/api/v1/users/user_info/${id}/`
  const token = await sessionStorage.getItem("authToken")
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`
    },
    method: "PATCH",
    data
  }

  return XHR(URL, options)
}

function* updateCustomer({data, id,toggle, currentpage }) {
  try {
    const response = yield call(updateCustomerApi,data,id)
    yield put(getAllCustomersData(currentpage))
    toast.success("Successfully updated!")
    toggle()
  } catch (e) {
    const { response } = e
    toast.error("Someting wrong!")
  }
}

export default all([
  takeLatest(GET_ALL_CUSTOMERS, getAllCustomers),
  takeLatest(ADD_CUSTOMER, addCustomer),
  takeLatest(CHANGE_NOTIFICATION, changeNotification),
  takeLatest(SEARCH_CUSTOMERS, searchCustomers),
  takeLatest(DELETE_CUSTOMER, deleteCustomer),
  takeLatest(UPDATE_CUSTOMER, updateCustomer)

])
