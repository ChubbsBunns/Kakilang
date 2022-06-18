import axios from "axios";
import React, { useState, useEffect } from "react";

/**
 * This functional component is used purely for testing purposes
 */
function TestFunction() {
  const server = process.env.REACT_APP_SERVER;
  const [img, setIMG] = useState();
  const [preview, setPreview] = useState();
  const [refresh, setRefresh] = useState(false);
  const [allIMG, setAllIMG] = useState([]);

  const imgSetting = (event) => {
    if (event.target.files.length !== 1) {
      setPreview(undefined);
      return;
    }
    const file = event.target.files[0];
    const reader1 = new FileReader();
    reader1.readAsDataURL(file);
    reader1.onloadend = function () {
      setPreview(reader1.result);
    };
    setIMG(file);
  };

  useEffect(() => {
    if (!refresh) return;
    const getIMG = async () => {
      const response = await axios
        .get(server + "/images/getImages")
        .then((res) => setAllIMG(res.data.images))
        .catch((err) => console.log(err));
      return response;
    };
    getIMG();
    return () => setAllIMG(undefined);
  }, [refresh]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const imageData = new FormData();
    imageData.append("myImage", img);
    imageData.append("name", img.name);
    console.log("ImageData: ", img);

    axios
      .post(server + "/images/upload", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="myImage" onChange={imgSetting} />
        <br />
        <img src={preview} alt="Unable to display image" />
        <br />
        <input className="submit" type="submit" value="Upload" />
      </form>
      <input
        onClick={function () {
          setRefresh(!refresh);
        }}
        value="Display All images"
        type="button"
      />
      <p>Image display</p>
      {refresh &&
        allIMG.map(({ name, image }) => {
          console.log(image);
          return (
            <>
              {name} <img src={server + "/" + image.path} />
              <br />
            </>
          );
        })}
    </>
  );
}

export default TestFunction;
