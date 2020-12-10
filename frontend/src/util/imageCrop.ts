import { blobToFile } from "./fns";
import { PhotoSettingsShape } from "../typings/Meta.typing";

function createImage(url: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PhotoSettingsShape
) {
  const image = (await createImage(imageSrc)) as HTMLImageElement;
  const [name, extension] = new URL(imageSrc).pathname
    .replace(`/${process.env.REACT_APP_RESUME_PHOTO_STORAGE_PATH}`, "")
    .split(".");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  if (ctx) {
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(pixelCrop.rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blobToFile(blob, name));
        }
      }, `image/${extension}`);
    });
  }
}
