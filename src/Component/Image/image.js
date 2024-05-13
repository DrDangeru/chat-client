import { useState, useEffect } from "react";

function Image(props) {
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    console.log('Image component props:', props);
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onload = function () {
      setImageSource(reader.result);
    };
    { console.log('Inside image') }
  }, [props.blob]); // Move the dependency array here

  return (
    <img style={{ width: 150, height: "auto" }}
      src={imageSource} alt={props.fileName} />
  );
}

export default Image;
