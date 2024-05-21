const normalizeOptions = (inputOptions) => {
  let quality = inputOptions.compressQuality ?? 70;
  if (typeof quality !== 'number') {
    quality = 70;
  }

  let { compressedHeight, compressedWidth } = inputOptions;
  if (typeof compressedHeight !== 'number' || compressedWidth <= 0) {
    compressedHeight = undefined;
  }
  if (typeof compressedWidth !== 'number' || compressedWidth <= 0) {
    compressedWidth = undefined;
  }
  return {
    quality,
    compressedWidth,
    compressedHeight,
  };
};
export async function compressImage(file, options) {
  const normalizedOptions = normalizeOptions(options);

  return new Promise((resolve, reject) => {
    wx.compressImage({
      src: file,
      ...normalizedOptions,
      success: (res) => resolve(res.tempFilePath),
      fail: reject,
    });
  });
}
