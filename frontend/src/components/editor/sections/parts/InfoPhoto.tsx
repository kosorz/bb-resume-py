import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import { useMutation } from "react-query";

import DeleteIcon from "../../../page/Trash";
import CameraIcon from "../../../page/Camera";

import RotateLeftIcon from "../../../page/RotateLeft";
import RotateRightIcon from "../../../page/RotateRight";

import axios from "../../../../util/axios";
import imageCrop from "../../../../util/imageCrop";
import { ResumeBubble } from "../../../../bubbles/ResumeBubble";
import { useDebounce } from "../../../../util/hooks";

const INFO_PHOTO_HEIGHT = 150;

const InvisibleInput = styled.input`
  display: none;
`;

const Delete = styled(DeleteIcon)`
  top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  right: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const Camera = styled(CameraIcon)`
  bottom: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  left: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const RotateLeft = styled(RotateLeftIcon)`
  top: ${({ theme }) => 4 * theme.spaceSmall + "px"};
  left: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const RotateRight = styled(RotateRightIcon)`
  top: ${({ theme }) => theme.spaceSmall / 2 + "px"};
  left: ${({ theme }) => theme.spaceSmall / 2 + "px"};
`;

const CameraInitial = styled(Camera)`
  height: 60px;
  width: auto;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.article`
  background: ${({ theme }) => theme.darkGray};
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ height }: { height: number; locked: boolean }) => height + "px"};

  &,
  > div,
  > div > img {
    border-top-left-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    border-top-right-radius: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    cursor: ${({ locked }: { height: number; locked: boolean }) =>
      locked ? "not-allowed" : "grab"};
  }

  > svg {
    border-radius: 50%;
    position: absolute;
    padding: ${({ theme }) => theme.spaceSmall / 2 + "px"};
    fill: ${({ theme }) => theme.white};
  }
`;

const InfoPhoto = ({ toggles }: { toggles: ReactNode }) => {
  const resumeBubble = useContext(ResumeBubble);
  const { resume, updateInfoCroppedPhoto, resetPhotoSettings } = resumeBubble;
  const { id, info, meta } = resume;
  const { photoSettings } = meta!;
  const { photo, cropped_photo, photo_locked } = info!;

  const invisibleInputRef = useRef<HTMLInputElement>(null);
  const skipInitialPhotoUpdate = useRef<boolean>(true);

  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(photo);
  const [rotation, setRotation] = useState(photoSettings.rotation);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    rotation: 0,
  });
  const debouncedCroppedPixels = useDebounce(croppedPixels, 100);

  const url = `/parts/${id}`;

  const cropPhoto = useMutation(
    (formData: FormData) =>
      axios.patch(url + "/info_photo_crop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: (res) => {
        updateInfoCroppedPhoto(res.data);
      },
    }
  );

  const addPhoto = useMutation(
    (formData: FormData) =>
      axios.patch(url + "/info_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: (res) => {
        resetPhotoSettings();
        setRotation(0);
        setImage(res.data);
      },
    }
  );

  const deletePhoto = useMutation(() => axios.delete(url + "/info_photo"), {
    onSuccess: () => {
      if (invisibleInputRef.current) {
        invisibleInputRef.current.value = "";
      }
      resetPhotoSettings();
      setRotation(0);
      updateInfoCroppedPhoto("");
      setImage("");
    },
  });

  useEffect(() => {
    const { width, height } = debouncedCroppedPixels;

    if (width && height) {
      if (image && (!cropped_photo || !skipInitialPhotoUpdate.current)) {
        imageCrop(
          `${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}${image}`,
          debouncedCroppedPixels
        ).then((file) => {
          var formData = new FormData();
          formData.append("f", file as File);
          formData.append(
            "photo_settings",
            JSON.stringify(debouncedCroppedPixels)
          );

          cropPhoto.mutate(formData);
        });
      }

      skipInitialPhotoUpdate.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCroppedPixels]);

  return (
    <>
      <InvisibleInput
        ref={invisibleInputRef}
        multiple={false}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            var formData = new FormData();
            formData.append("f", e.target.files[0]);

            addPhoto.mutate(formData);
          }
        }}
        type="file"
        name="resume-photo"
        id="resume-photo"
        accept="image/png,image/jpeg"
      />
      <Wrapper height={INFO_PHOTO_HEIGHT} locked={photo_locked}>
        {image ? (
          <>
            <Cropper
              image={`${process.env.REACT_APP_OBJECT_STORAGE_URL}${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}${image}`}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              onCropChange={(crop) => {
                if (photo_locked && loaded) return;
                setCrop(crop);
              }}
              onZoomChange={(zoom) => {
                if (photo_locked && loaded) return;
                setZoom(zoom);
              }}
              onCropComplete={(_, croppedAreaPixels) => {
                if (photo_locked && loaded) return;
                setCroppedPixels({ rotation, ...croppedAreaPixels });
              }}
              restrictPosition={true}
              initialCroppedAreaPixels={photoSettings}
              onMediaLoaded={({ height }) => {
                !photoSettings.height && setZoom(height / INFO_PHOTO_HEIGHT);
                setTimeout(() => setLoaded(true), 0);
              }}
              aspect={1}
              maxZoom={5}
              showGrid={!photo_locked}
            />
            {toggles}
            {!photo_locked && (
              <>
                <Camera onClick={() => invisibleInputRef.current?.click()} />
                <RotateLeft
                  onClick={() => setRotation((prevState) => prevState - 90)}
                />
                <RotateRight
                  onClick={() => setRotation((prevState) => prevState + 90)}
                />
                <Delete onClick={() => deletePhoto.mutate()} />
              </>
            )}
          </>
        ) : (
          <CameraInitial onClick={() => invisibleInputRef.current?.click()} />
        )}
      </Wrapper>
    </>
  );
};

export default InfoPhoto;
