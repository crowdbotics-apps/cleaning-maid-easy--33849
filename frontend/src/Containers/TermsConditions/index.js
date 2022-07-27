import React, { useState } from "react"
import { useEffect } from "react"
// reactstrap components
import { Row, Col, Spinner } from "reactstrap"

import { connect } from "react-redux"
import { renderHtmlText } from "../Services/redux/actions"
import { getTermsConditions } from "../TermsConditions/redux/actions"
function TermsConditions(props) {
  const { termsConditions, requesting } = props

  useEffect(() => {
    props.renderHtmlText("Terms Conditions")
    props.getTermsConditions()
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
              termsConditions &&
              termsConditions.map(item => (
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
  termsConditions: state.termsConditions.termsConditions,
  requesting: state.termsConditions.requesting
})

const mapDispatchToProps = dispatch => ({
  renderHtmlText: data => dispatch(renderHtmlText(data)),
  getTermsConditions: () => dispatch(getTermsConditions())
})
export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions)
