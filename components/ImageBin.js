import React, { useState } from 'react';
import { Image } from 'react-native';
import { encode as btoa } from 'base-64'

const ImageBin = ({ img, width, height }) => {
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return btoa(binary);
    };

    const { contentType } = img;
    const { data } = img.data;
    const [base, setBase] = useState(arrayBufferToBase64(data));

    return (
        <Image
            style={{
                width: width || "100%",
                height: height || 710,
                resizeMode: 'cover',
                backgroundColor: 'red',
            }}
            source={{ uri: `data:${contentType};base64,${base}` }}
        />
    );
}

export default ImageBin;
