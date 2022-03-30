import React, { useState, useRef } from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

// import defaultImage from "assets/img/image_placeholder.jpg";
// import defaultAvatar from "assets/img/placeholder.jpg";
import logo from '../../assets/img/ayo-ogunseinde-2.jpg';
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

function ImageUpload(props) {
  const { allServices, index, mainImg, mainImage,width,height, setImage} = props;

  const [previewImage, setPreviewImage] = useState(false);
  const [showImg, setShowImg]=useState('')

  const imageRef = useRef();


  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    setShowImg(file.name)
    mainImage(file)
    reader.onloadend = () => {
      // console.log("reader.result",reader.result);
      setPreviewImage(reader.result);
      // mainImg ? mainImage(reader.result) : (allServices[index].icon = reader.result);
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result,
      // });
      // this.props.setAllServices((this.props.allServices) => [...this.props.allServices, {}])
    };
    reader.readAsDataURL(file);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const handleClick = () => {
    imageRef.current.click();
  };

  // const handleRemove = () => {
  //   this.setState({
  //     file: null,
  //     // imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
  //     imagePreviewUrl: '',
  //   });
  //   this.refs.fileInput.value = null;
  // };

  return (
    <div className="fileinput text-center">
      <form encType='multipart/form-data'>
      <input type="file" name='myImage' onChange={handleImageChange} ref={imageRef} />
      </form>
      {mainImg && (
        <>
            <div>
              <img
                src={previewImage ? previewImage: defaultAvatar}
                height={height}
                width={width}
                style={{borderRadius:'50%'}}
              />
            </div>
        </>
      )}
        <div>
         <button onClick={handleClick} style={styles.uploadText}>Upload Photo</button>
        </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;

const styles = {
  uploadText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#034EA2",
    backgroundColor: "white",
    border: 0,
    boxShadow: "none",
    outline: "none",
    paddingTop:10
  },

}
