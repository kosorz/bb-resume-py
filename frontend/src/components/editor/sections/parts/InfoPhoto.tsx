import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";

import FormikLabel from "./Label";
import Trash from "../../../page/Trash";

import axios from "../../../../util/axios";

const InvisibleInput = styled.input`
  display: none;
`;

const Delete = styled(Trash)`
  margin-top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  border-radius: 50%;
`;

const Uploader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 100%;
`;

const OwnerFrame = styled.div`
  width: 100px;
  height: auto;
  position: relative;

  &:hover::before {
    content: attr(data-change);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.white};
    z-index: 1;
    pointer-events: none;
  }
`;

const Owner = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    filter: brightness(50%);
    transition: all 0.5s ease;
  }
`;

const Empty = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  text-align: center;
  align-items: center;
  border: 1px dashed;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.spaceSmall / 4 + "px"};
`;

const InfoPhoto = () => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfoPhoto } = resumeBubble;
  const { id, info, meta } = resume;
  const { photo } = info!;
  const { colors } = meta!;

  const invisibleInputRef = useRef<HTMLInputElement>(null);

  const url = `/parts/${id}/info-photo`;

  return (
    <>
      <InvisibleInput
        ref={invisibleInputRef}
        multiple={false}
        onChange={(e) => {
          var formData = new FormData();
          e.target.files && formData.append("f", e.target.files[0]);

          axios
            .patch(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => updateInfoPhoto(res.data));
        }}
        type="file"
        name="resume-photo"
        id="resume-photo"
        accept="image/png,image/jpeg"
      />
      <FormikLabel name={"photo"} />
      <Uploader>
        {photo ? (
          <>
            <OwnerFrame data-change="Change">
              <Owner
                onClick={() => invisibleInputRef.current?.click()}
                alt="You"
                src={`${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}${photo}`}
              />
            </OwnerFrame>
            <Delete
              onClick={() =>
                axios.delete(url).then((res) => updateInfoPhoto(res.data))
              }
            />
          </>
        ) : (
          <Empty
            style={{ borderColor: colors.main }}
            onClick={() => invisibleInputRef.current?.click()}
          >
            Upload your photo
          </Empty>
        )}
      </Uploader>
    </>
  );
};

export default InfoPhoto;
