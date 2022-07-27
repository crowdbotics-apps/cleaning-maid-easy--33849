import React, { useEffect, useState, useRef } from "react"
import { NavLink, Link } from "react-router-dom"
import { Nav, Collapse, Button } from "reactstrap"
import avatar from "assets/img/placeholder.jpg"
import { connect } from "react-redux"

//  Actions
import { uploadImage } from "../../Containers/Profile/redux/actions"

function UserProfile(props) {
  const { userInfoData ,userName} = props

  const [userInfo, setUserInfo] = useState(false)
  const [previewImage, setPreviewImage] = useState(false)

  useEffect(() => {
    const userData = sessionStorage.getItem("userInfo")
    const userInfoData = JSON.parse(userData)
    setUserInfo(userInfoData)
  }, [])

  const imageRef = useRef()

  const handleImageChange = e => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    const data = new FormData()
    data.append("profile_picture", file)

    props.uploadImage(data, userInfo.id)

    // console.log("this.userInfo.id",this.state.userInfo.id);

    reader.onloadend = () => {
      // console.log("reader.result",reader.result);
      setPreviewImage(reader.result)
      // mainImg ? mainImage(reader.result) : (allServices[index].icon = reader.result);
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result,
      // });
      // this.props.setAllServices((this.props.allServices) => [...this.props.allServices, {}])
    }
  }

  const handleClick = () => {
    imageRef.current.click()
  }

  return (
    <div>
{/* userName?.length */}
      <span style={{
         fontSize: 8,
         color: "#034EA2",
         fontWeight: "600",
         // marginLeft: 5,
         display: "block",
         backgroundColor: "white",
         // overflow: 'hidden',
         paddingTop: userName?.length===null || userName?.length===0? 25 :5,
         border: 0,
         outline: "none"
      }}>
        <div className="fileinput text-center">
          <form encType="multipart/form-data">
            <input
              type="file"
              name="myImage"
              onChange={handleImageChange}
              ref={imageRef}
              previewImage
            />
          </form>
          <div>
            <button onClick={handleClick} style={styles.uploadText}>
              Upload Photo
            </button>
          </div>
        </div>
      </span>
      {/* 
      <div
        style={{
          borderBottom: !document.body.classList.contains("sidebar-mini")
            ? "groove"
            : "",
          borderWidth: !document.body.classList.contains("sidebar-mini") && 1,
          borderColor: "gray",
          opacity: 0.3,
          paddingTop: 17,
          width: "100%"
        }}
      ></div> */}
    </div>
  )
}

const mapStateToProps = state => ({
  userInfoData: state.profile.userInfo
})

const mapDispatchToProps = dispatch => ({
  uploadImage: (data, id) => dispatch(uploadImage(data, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export const styles = {
  textStyle: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "500",
    fontFamily: "Ubuntu",
    display: "block",
    paddingTop: "inherit"
    // overflow: 'hidden'
  },
  uploadText: {
    fontSize: 8,
    color: "#034EA2",
    fontWeight: "600",
    // marginLeft: 5,
    display: "block",
    backgroundColor: "white",
    // overflow: 'hidden',
    paddingTop: 5,
    border: 0,
    outline: "none"
  }
}
