import { useState, useEffect } from "react";

function Image(props) {
  const [imageSource, setImageSource] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    // console.log('Image component props:', props);
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onload = function () {
      setImageSource(reader.result);
    };
    { console.log('Inside image') }
    const objectUrl = URL.createObjectURL(props.blob);
    setDownloadUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [props.blob]);

  return (
    <div>
      <img style={{ maxWidth: "35vw", width: "100%", height: "auto" }} src={imageSource} alt={props.fileName} />
      <a href={downloadUrl} download={props.fileName} style={{ display: 'block', marginTop: '10px' }}>
        Download Image
      </a>
    </div>
  );
}

export default Image;
