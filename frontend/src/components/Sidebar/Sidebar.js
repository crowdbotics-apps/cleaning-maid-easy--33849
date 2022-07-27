import React, { useRef, useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { Nav, Collapse, Button } from "reactstrap"
// import { connect } from "react-redux"
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar"
import { uploadImage } from "../../Containers/Profile/redux/actions"
import { connect, useDispatch } from "react-redux"
import UserProfile from "./UserProfile"

import avatar from "assets/img/placeholder.jpg"
var ps

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    // const imageRef = t
    this.imageRef = React.createRef(null)
    this.state = this.getCollapseStates(props.routes)
    this.state = {
      userNewInfo: "",
      showImage: false
      // imageRef:this.useRef()
    }
  }

  getCollapseStates = routes => {
    let initialState = {}
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        }
      }
      return null
    })
    return initialState
  }

  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null
      }
      if (prop.collapse) {
        var st = {}
        st[prop["state"]] = !this.state[prop.state]
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              onClick={e => {
                e.preventDefault()
                this.setState(st)
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        )
      }

      return (
        <>
          {prop.isShow && (
            <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
              <NavLink to={prop.layout + prop.path} activeClassName="">
                {prop.icon !== undefined ? (
                  <>
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </>
                ) : (
                  <>
                    <span className="sidebar-mini-icon">{prop.mini}</span>
                    <span className="sidebar-normal">{prop.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          )}
        </>
      )
    })
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : ""
  }
 async componentDidMount() {
    // const userData =await sessionStorage.getItem("userInfo")
    // const userInfo = JSON.parse(userData)
    // this.setState({
    //   userNewInfo: userInfo
    // })
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      })
    }
  }
  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy()
    }
  }
  handleImageChange = e => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    const data = new FormData()
    data.append("profile_picture", file)

    this.props.uploadImage(data, this.state.userInfo.id)

    // console.log("this.userInfo.id",this.state.userInfo.id);

    // this.setState({
    //   showImage:file
    // })

    // mainImage(file)
    // reader.onloadend = () => {
    //   // setPreviewImage(reader.result)
    // }
    reader.readAsDataURL(file)
  }

  handleClick = () => {
    this.imageRef.current.click()
  }

  // getData = async () =>{
  //   const userData = await sessionStorage.getItem("userInfo")
  //   const userInfo = JSON.parse(userData)
  //   return userInfo
  // }

  render() {
   
    const userData = sessionStorage.getItem("userInfo")
      const userInfo = JSON.parse(userData)

      // const dataaa=this.getData().then((item) => this.setState({
      //   userNewInfo:item
      // }))
   
    return (
      <div
        className="sidebar"
        data-color={"white"}
        data-active-color={this.props.activeColor}
      >
        <div className="logo user">
            <NavLink
              to="/admin/profile"
              activeClassName=""
              style={{ display: "contents" }}
            >
              <div>
                <img
                  className="photo"
                  src={
                    this.props?.userInfoData?.profile_picture ? this.props.userInfoData.profile_picture: userInfo? userInfo.profile_picture: avatar
                  }
                />
              </div>
              <div className="info">
              <a
                data-toggle="collapse"
                aria-expanded={this.state.openAvatar}
                onClick={() =>
                  this.setState({ openAvatar: !this.state.openAvatar })
                }
              >
                <span style={styles.textStyle}>
                  {!document.body.classList.contains("sidebar-mini")
                    ? this.props?.userInfoData?.name ? this.props?.userInfoData?.name: userInfo
                      ? userInfo?.name===null ? '' : userInfo?.name?.length ===0 ?'': userInfo?.name
                      : ''
                    : ""}
                </span>
              </a>
            </div>
            </NavLink>
            {
              !document.body.classList.contains("sidebar-mini")? (
                <UserProfile userName={userInfo?.name}/>
              ):''
            }
            
          {/* <NavLink
            to="/admin/profile"
            activeClassName=""
            style={{ display: "contents" }}
          >
            <div>
              <img
                className="photo"
                src={
                  this.state.userInfo
                    ? this.state.userInfo.profile_picture
                    : avatar
                }
              />
            </div>

            <div className="info">
              <a
                data-toggle="collapse"
                aria-expanded={this.state.openAvatar}
                onClick={() =>
                  this.setState({ openAvatar: !this.state.openAvatar })
                }
              >
                <span style={styles.textStyle}>
                  {!document.body.classList.contains("sidebar-mini")
                    ? this.state.userInfo
                      ? `${this.state.userInfo.name}`
                      : "User Name"
                    : ""}
                </span>
              </a>
            </div>
          </NavLink>
          <span style={styles.uploadText}>

            {!document.body.classList.contains("sidebar-mini") ? (
              <div className="fileinput text-center">
                <form encType="multipart/form-data">
                  <input
                    type="file"
                    name="myImage"
                    onChange={this.handleImageChange}
                    ref={this.imageRef}
                  />
                </form>
                <div>
                  <button 
                  onClick={this.handleClick} 
                  style={styles.uploadText}>
                    Upload Photo
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </span>

          <div
            style={{
              borderBottom: !document.body.classList.contains("sidebar-mini")
                ? "groove"
                : "",
              borderWidth:
                !document.body.classList.contains("sidebar-mini") && 1,
              borderColor: "gray",
              opacity: 0.3,
              paddingTop: 17,
              width: "100%"
            }}
          ></div> */}

          <div
            style={{
              borderBottom: !document.body.classList.contains("sidebar-mini")
                ? "groove"
                : "",
              borderWidth:
                !document.body.classList.contains("sidebar-mini") && 1,
              borderColor: "gray",
              opacity: 0.3,
              paddingTop: 17,
              width: "100%"
            }}
          ></div>
        </div>

        <div className="sidebar-wrapper pt-4" ref="sidebar">
          {/* <div className='user'>
            <div className='photo'>
              <img src={avatar} alt='Avatar' />
            </div>
            <div className='info'>
              <a
                href='#pablo'
                data-toggle='collapse'
                aria-expanded={this.state.openAvatar}
                onClick={() =>
                  this.setState({openAvatar: !this.state.openAvatar})
                }
              >
                <span>
                  Chet Faker
                  <b className='caret' />
                </span>
              </a>
              <Collapse isOpen={this.state.openAvatar}>
                <ul className='nav'>
                  <li>
                    <NavLink to='/admin/user-profile' activeClassName=''>
                      <span className='sidebar-mini-icon'>MP</span>
                      <span className='sidebar-normal'>My Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/user-profile' activeClassName=''>
                      <span className='sidebar-mini-icon'>EP</span>
                      <span className='sidebar-normal'>Edit Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/user-profile' activeClassName=''>
                      <span className='sidebar-mini-icon'>S</span>
                      <span className='sidebar-normal'>Settings</span>
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </div>
          </div> */}
          <Nav>{this.createLinks(this.props.routes)}</Nav>
        </div>
      </div>
    )
  }
}

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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})
// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export default Sidebar
