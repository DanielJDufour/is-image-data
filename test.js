const test = require("flug");

const { isImageData, isRGB, isRGBA } = require("./is-image-data.js");

const saveAndDisplay = async (filename, buf) => {
  fs.writeFileSync(filename, buf);
  const terminalImage = await import("terminal-image");
  console.log(await terminalImage.default.buffer(buf));
};

const findAndReadImage = async (filename) => {
  const buf = await findAndRead(filename);
  const { height, width, pixels } = await readim({ data: buf });
  return { height, width, data: pixels };
};

test("isColorStats JPG", async ({ eq }) => {
  const stats = [
    { min: 3, max: 218 },
    { min: 10, max: 212 },
    { min: 0, max: 209 },
    { min: 255, max: 255 }
  ];
  eq(isImageData({ stats }), true);
  eq(isRGB({ stats }), false);
  eq(isRGBA({ stats }), true);
});

test("isColorStats PNG", async ({ eq }) => {
  const stats = [
    { min: 3, max: 218 },
    { min: 10, max: 212 },
    { min: 0, max: 209 }
  ];
  eq(isImageData({ stats }), true);
  eq(isRGB({ stats }), true);
  eq(isRGBA({ stats }), false);
});

test("isColorStats Landsat Scene", ({ eq }) => {
  const stats = { bands: [{ min: 0, max: 62196 }] };
  eq(isImageData({ stats }), false);
  eq(isRGB({ stats }), false);
  eq(isRGBA({ stats }), false);
});
