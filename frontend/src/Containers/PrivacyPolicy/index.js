import React, { useState, useEffect } from "react"

// reactstrap components
import { Row, Col, Spinner } from "reactstrap"

import { connect } from "react-redux"
import { renderHtmlText } from "../Services/redux/actions"
import { getPrivacyPolicy } from "../TermsConditions/redux/actions"

function PrivacyPolicy(props) {
  const { privacyPolicy, requesting } = props

  useEffect(() => {
    props.renderHtmlText("Privacy Policy")
    props.getPrivacyPolicy()
  }, [])

  return (
    <div className="content bg-white pl-4">
      <Row>
        <Col lg="7" md="12">
          <div className="pt-4">
            {requesting ? (
              <div className="pt-3 d-flex justify-content-center">
                <Spinner size="lg" />
              </div>
            ) : (
              privacyPolicy &&
              privacyPolicy.map(item => (
                <div dangerouslySetInnerHTML={{ __html: item.terms }}></div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
const mapStateToProps = state => ({
  privacyPolicy: state.termsConditions.privacyPolicy,
  requesting: state.termsConditions.requesting
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getPrivacyPolicy: () => dispatch(getPrivacyPolicy())
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy)
