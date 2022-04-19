import {
  GET_TERMS_CONDITIONS,
  GET_TERMS_CONDITIONS_SUCCESS,
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  RESET
} from "./types"

export const getTermsConditions = () => ({
  type: GET_TERMS_CONDITIONS
})

export const getPrivacyPolicy = () => ({
  type: GET_PRIVACY_POLICY
})

export const getTermsConditionsSuccess = data => ({
  type: GET_TERMS_CONDITIONS_SUCCESS,
  data
})

export const getPrivacyPolicySuccess = data => ({
  type: GET_PRIVACY_POLICY_SUCCESS,
  data
})


export const reset = () => ({
  type: RESET,
})

