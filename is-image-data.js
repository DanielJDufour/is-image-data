function findBandStats({ stats }) {
  if (typeof stats === "object") {
    if (Array.isArray(stats)) {
      return stats;
    } else if (Array.isArray(stats.bands)) {
      return stats.bands;
    }
  }
}

function isRGB({ stats }) {
  stats = findBandStats({ stats });
  return (
    stats.length === 3 &&
    stats.every((band) => band.min >= 0 && band.max <= 255) &&
    stats.some((band) => band.max >= 128)
  );
}

function isRGBA({ stats }) {
  stats = findBandStats({ stats });
  return (
    stats.length === 4 &&
    stats.every((band) => band.min >= 0 && band.max <= 255) &&
    stats.some((band) => band.max >= 128)
  );
}

function isImageData({ stats }) {
  return isRGBA({ stats }) || isRGB({ stats });
}

module.exports = {
  findBandStats,
  isImageData,
  isRGB,
  isRGBA
};
