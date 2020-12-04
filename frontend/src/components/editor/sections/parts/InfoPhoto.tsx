import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";

import ImageIcon from "../../../page/Image";
import RefreshIcon from "../../../page/Refresh";
import Trash from "../../../page/Trash";

import axios from "../../../../util/axios";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

const InvisibleInput = styled.input`
  display: none;
`;

const Delete = styled(Trash)`
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: 50%;
  position: absolute;
  bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  fill: ${({ theme }) => theme.white};
`;

const Refresh = styled(RefreshIcon)`
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: 50%;
  position: absolute;
  top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const Wrapper = styled.article`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: ${({ theme }) => theme.darkGray};

  &,
  > div,
  > div > img {
    border-top-left-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    border-top-right-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  }
`;

const Image = styled(ImageIcon)`
  border-radius: 50%;
  height: 60px;
  width: auto;
  padding: ${({ theme }) => theme.spaceSmall + "px"};
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const InfoPhoto = () => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfoPhoto } = resumeBubble;
  const { id, info } = resume;
  const { photo } = info!;

  const [cropperState, setCropperState] = useState({
    image: photo,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });

  const invisibleInputRef = useRef<HTMLInputElement>(null);

  const url = `/parts/${id}/info-photo`;

  const onCropChange = (crop: { x: number; y: number }) => {
    setCropperState((prevState) => {
      return {
        ...prevState,
        crop,
      };
    });
  };

  const onZoomChange = (zoom: number) => {
    setCropperState((prevState) => {
      return { ...prevState, zoom };
    });
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedAreaPixels);
  };

  return (
    <>
      <InvisibleInput
        ref={invisibleInputRef}
        multiple={false}
        onChange={(e) => {
          if (!e.target.value) {
            return;
          }

          var formData = new FormData();
          e.target.files && formData.append("f", e.target.files[0]);

          axios
            .patch(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              setCropperState((prevState) => {
                return { ...prevState, image: res.data };
              });
              updateInfoPhoto(res.data);
            });
        }}
        type="file"
        name="resume-photo"
        id="resume-photo"
        accept="image/png,image/jpeg"
      />
      <Wrapper>
        {photo ? (
          <>
            <Cropper
              image={`${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}${cropperState.image}`}
              crop={cropperState.crop}
              zoom={cropperState.zoom}
              aspect={cropperState.aspect}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
            <Refresh onClick={() => invisibleInputRef.current?.click()} />
            <Delete
              onClick={() => {
                axios.delete(url).then((res) => {
                  if (invisibleInputRef.current) {
                    invisibleInputRef.current.value = "";
                  }
                  setCropperState({
                    image: photo,
                    crop: { x: 0, y: 0 },
                    zoom: 1,
                    aspect: 1,
                  });
                  updateInfoPhoto(res.data);
                });
              }}
            />
          </>
        ) : (
          <Image onClick={() => invisibleInputRef.current?.click()} />
        )}
      </Wrapper>
    </>
  );
};

export default InfoPhoto;
