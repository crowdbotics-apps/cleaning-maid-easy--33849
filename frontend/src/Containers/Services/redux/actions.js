import {
  GET_SERVICES,
  GET_SERVICES_SUCCESS,
  ADD_SERVICES,
  ADD_SERVICES_FAILURE,
  RESET,
} from './types';

export const  getServices= () => ({
  type: GET_SERVICES,
});

export const getServicesSuccess = (data) => ({
  type: GET_SERVICES_SUCCESS,
  data,
});

export const addServices = (data, setModal) => ({
  type: ADD_SERVICES,
  data,
  setModal
});

export const addServicesFailure = (data) => ({
  type: ADD_SERVICES_FAILURE,
  data,
});

export const resetServices = () => ({
  type: RESET
});

