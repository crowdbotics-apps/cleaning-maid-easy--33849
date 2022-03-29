import { all, call, put, takeLatest } from "redux-saga/effects"
import { push } from "connected-react-router"

// config
import { BASE_URL } from "../../../config/app"

// utils
import XHR from "../../../utils/XHR"

// types
import { GET_ALL_CUSTOMERS ,ADD_CUSTOMER} from "./types"

// actions
import { getAllCustomersSuccess,getAllCustomers as getAllCustomersData } from "./actions"

async function getAllCustomersAPI() {
  const URL = `${BASE_URL}/api/v1/users/customers_list/`
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

function* getAllCustomers() {
  try {
    const response = yield call(getAllCustomersAPI)

    yield put(getAllCustomersSuccess(response.data.results))
  } catch (e) {
    const { response } = e
    yield put(getAllCustomersSuccess(false))
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

function* addCustomer({data}) {
  try {
    const response = yield call(addCustomerApi,data)
    yield put(getAllCustomersData())
  } catch (e) {
    const { response } = e
  }
}

export default all([
  takeLatest(GET_ALL_CUSTOMERS, getAllCustomers),
  takeLatest(ADD_CUSTOMER, addCustomer)

])
