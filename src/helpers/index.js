export const addImageProcess = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img.height);
    img.onerror = reject;
    img.src = src;
  });
};
