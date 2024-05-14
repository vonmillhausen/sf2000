/*

  Von Millhausen's SF2000 Tools Shared JS Library
  ===============================================

  There's a bit of overlap between what my SF2000 tools do (e.g., CRC32
  recalculation is fairly common, etc.), and there's some general functions
  that might be useful for future tools as well (e.g., `bisrv.asd` hash
  checking), so rather than repeating code in each separate tool, any "shared"
  functions will go here.

  Just like the tools themselves, this file should be considered CC0 Public
  Domain (https://creativecommons.org/publicdomain/zero/1.0/)

  Version 1.7: Added ordered dithering support to imageDataToRgb565(). Also
    swapped out the Gaussian resampling function in scaleImage() for a higher
    quality algorithm based on a semi-custom hybrid between a looped 50%
    bilinear downsampling scheme and a Hermite interpolation resampler. Added a
    "keepAlpha" argument to imageToImageData() (defaults to true) - if false,
    the provided image is drawn on a black background, removing any alpha
    channel; this was added as a utility for the boot logo changer. Also
    generally tidied up the code here and there (changed vars to lets/consts,
    replaced the SVG icons with simple emoji, fixed a few small logic edge
    cases, etc.)

  Version 1.6: Added support for the (hopefully not broken) October 13th BIOS in
    getFirmwareHash() and knownHash()

  Version 1.5: Added support for the (broken) October 7th BIOS in
    getFirmwareHash() and knownHash()

  Version 1.4: Re-ordered the getFirmwareHash() zeroing-out checks to match the
    expected order to find them in in the BIOS file - just some future-proofing
    in case some user-substituted content (e.g., a boot logo) happens to contain
    bytes that a subsequent call to findSequence() might accidentally match. I
    also added some comments with the rough location of each block within the
    file, so if I have to add something else in the future I'll be able to slide
    it into the right place :)

  Version 1.3: Added support for blanking out the SNES audio bitrate and cycles
    bits that `bnister` identified as a workaround for the "start-SNES-games-
    twice" issue that cropped up in firmware versions after March

  Version 1.2: Added support for blanking out the power curve monitoring bytes
    in getFirmwareHash(), and updated the hashes accordingly in knownHash()

  Version 1.1: Added support for the August 3rd BIOS in getFirmwareHash() and
    knownHash()

  Version 1.0: Initial version

*/

// This function takes in a Uint8Array object, and patches bytes 0x18c to
// 0x18f with an updated CRC32 calculated on bytes 512 to the end of the
// array. Credit to `bnister` for this code!
function patchCRC32(data) {
  let c;
  const tabCRC32 = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    c = i << 24;
    for (let j = 0; j < 8; j++) {
      c = c & (1 << 31) ? c << 1 ^ 0x4c11db7 : c << 1;
    }
    tabCRC32[i] = c;
  }
  c = ~0;
  for (let i = 512; i < data.length; i++) {
    c = c << 8 ^ tabCRC32[c >>> 24 ^ data[i]];
  }
  data[0x18c] = c & 255;
  data[0x18d] = c >>> 8 & 255;
  data[0x18e] = c >>> 16 & 255;
  data[0x18f] = c >>> 24;
}

// Returns an SHA-256 hash of a given firmware (ignoring common user changes),
// or returns false on failure...
function getFirmwareHash(data) {

  // Data should be a Uint8Array, which as an object is passed by reference...
  // we're going to be manipulating that data before generating our hash, but we
  // don't want to modify the original object at all... so we'll create a copy,
  // and work only on the copy...
  const dataCopy = data.slice();

  // Only really worthwhile doing this for big bisrv.asd files...
  if (dataCopy.length > 12600000) {

    // First, replace CRC32 bits with 00...
    dataCopy[0x18C] = 0x00;
    dataCopy[0x18D] = 0x00;
    dataCopy[0x18E] = 0x00;
    dataCopy[0x18F] = 0x00;

    // Next we'll look for (and zero out) the five bytes that the power
    // monitoring functions of the SF2000 use for switching the UI's battery
    // level indicator. These unfortunately can't be searched for - they're just
    // in specific known locations for specific firmware versions...
    // Location: Approximately 0x35A8F8 (about 25% of the way through the file)
    const prePowerCurve = findSequence([0x11, 0x05, 0x00, 0x02, 0x24], dataCopy);
    if (prePowerCurve > -1) {
      const powerCurveFirstByteLocation = prePowerCurve + 5;
      switch (powerCurveFirstByteLocation) {
        case 0x35A8F8:
          // Seems to match mid-March layout...
          dataCopy[0x35A8F8] = 0x00;
          dataCopy[0x35A900] = 0x00;
          dataCopy[0x35A9B0] = 0x00;
          dataCopy[0x35A9B8] = 0x00;
          dataCopy[0x35A9D4] = 0x00;
          break;

        case 0x35A954:
          // Seems to match April 20th layout...
          dataCopy[0x35A954] = 0x00;
          dataCopy[0x35A95C] = 0x00;
          dataCopy[0x35AA0C] = 0x00;
          dataCopy[0x35AA14] = 0x00;
          dataCopy[0x35AA30] = 0x00;
          break;

        case 0x35C78C:
          // Seems to match May 15th layout...
          dataCopy[0x35C78C] = 0x00;
          dataCopy[0x35C794] = 0x00;
          dataCopy[0x35C844] = 0x00;
          dataCopy[0x35C84C] = 0x00;
          dataCopy[0x35C868] = 0x00;
          break;

        case 0x35C790:
          // Seems to match May 22nd layout...
          dataCopy[0x35C790] = 0x00;
          dataCopy[0x35C798] = 0x00;
          dataCopy[0x35C848] = 0x00;
          dataCopy[0x35C850] = 0x00;
          dataCopy[0x35C86C] = 0x00;
          break;

        case 0x3564EC:
          // Seems to match August 3rd layout...
          dataCopy[0x3564EC] = 0x00;
          dataCopy[0x3564F4] = 0x00;
          dataCopy[0x35658C] = 0x00;
          dataCopy[0x356594] = 0x00;
          dataCopy[0x3565B0] = 0x00;
          break;
        
        case 0x356638:
          // Seems to match October 7th/13th layout...
          dataCopy[0x356638] = 0x00;
          dataCopy[0x356640] = 0x00;
          dataCopy[0x3566D8] = 0x00;
          dataCopy[0x3566E0] = 0x00;
          dataCopy[0x3566FC] = 0x00;
          break;
      
        default:
          return false;
      }
    }
    else {
      return false;
    }

    // Next identify the emulator button mappings (if they exist), and blank
    // them out too...
    // Location: Approximately 0x8D6200 (about 75% of the way through the file)
    const preButtonMapOffset = findSequence([0x00, 0x00, 0x00, 0x71, 0xDB, 0x8E, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], dataCopy);
    if (preButtonMapOffset > -1) {
      const postButtonMapOffset = findSequence([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00], dataCopy, preButtonMapOffset);
      if (postButtonMapOffset > -1) {
        for (let i = preButtonMapOffset + 16; i < postButtonMapOffset; i++) {
          dataCopy[i] = 0x00;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }

    // Next identify the boot logo position, and blank it out too...
    // Location: Approximately 0x9B3520 (about 80% of the way through the file)
    const badExceptionOffset = findSequence([0x62, 0x61, 0x64, 0x5F, 0x65, 0x78, 0x63, 0x65, 0x70, 0x74, 0x69, 0x6F, 0x6E, 0x00, 0x00, 0x00], dataCopy);
    if (badExceptionOffset > -1) {
      const bootLogoStart = badExceptionOffset + 16;
      for (let i = bootLogoStart; i < (bootLogoStart + 204800); i++) {
        dataCopy[i] = 0x00;
      }
    }
    else {
      return false;
    }

    // Next we'll look for and zero out the bytes used for SNES audio rate and
    // CPU cycles, in case folks want to patch those bytes to correct SNES
    // first-launch issues on newer firmwares...
    // Location: Approximately 0xC0A170 (about 99% of the way through the file)
    const preSNESBytes = findSequence([0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x80], dataCopy);
    if (preSNESBytes > -1) {
      const snesAudioBitrateBytes = preSNESBytes + 8;
      const snesCPUCyclesBytes = snesAudioBitrateBytes + 8;
      dataCopy[snesAudioBitrateBytes] = 0x00;
      dataCopy[snesAudioBitrateBytes + 1] = 0x00;
      dataCopy[snesCPUCyclesBytes] = 0x00;
      dataCopy[snesCPUCyclesBytes + 1] = 0x00;
    }
    else {
      return false;
    }

    // If we're here, we've zeroed-out all of the bits of the firmware that are
    // semi-user modifiable (CRC32 bits, boot logo, button mappings and power
    // curve bytes); now we can generate a hash of what's left and compare it
    // against some known values...
    return crypto.subtle.digest("SHA-256", dataCopy.buffer)
    .then(function(digest) {
      const array = Array.from(new Uint8Array(digest));
      return array.map(byte => ("00" + byte.toString(16)).slice(-2)).join("");
    })
    .catch(function(error) {
      return false;
    });
  }
  else {
    return false;
  }
}

// This function searches for array needle in array haystack starting at offset
// and returns the zero-based index of the first match found, or -1 if not
// found...
function findSequence(needle, haystack, offset = 0) {

  // Loop through the haystack array starting from the offset...
  for (let i = offset; i < haystack.length - needle.length + 1; i++) {

    // Assume a match until proven otherwise...
    let match = true;

    // Loop through the needle array and compare each byte...
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        // Mismatch found, break the inner loop and continue the outer loop...
        match = false;
        break;
      }
    }

    // If match is still true after the inner loop, we have found a match;
    // return the index of the start of the match...
    if (match) {
      return i;
    }
  }

  // If we reach this point, no match was found...
  return -1;
}

// Generic download function, for sending data to the user's browser as a
// download...
function downloadToBrowser(data, type, name) {
  // Send the data to the user's browser as a file download...
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(new Blob([data], {type: type}));
  link.download = name;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

// This simple function takes in a string representing an SHA1 hash, and
// compares it against the known hashes my tools use for the various stock
// firmware versions; returns a string with my internal "MM.DD" firmware naming
// convention, or false if the provided hash doesn't match...
function knownHash(hash) {
  switch (hash) {
    case "149706c009c446267e767313e149adc733d167d25e731694b2bdb1646a41ed08":
      return "03.15";

    case "151d5eeac148cbede3acba28823c65a34369d31b61c54bdd8ad049767d1c3697":
      return "04.20";

    case "ab0ce4923086afc535154023ddea1d355bcedb89e6314a47d9c1b77c7a9e75e3":
      return "05.15";

    case "67c5dfc5825a0d9cf953206c2231b29512482e97fef688fe32bf5c31acdb370a":
      return "05.22";

    case "5335860d13214484eeb1260db8fe322efc87983b425ac5a5f8b0fcdf9588f40a":
      return "08.03";
    
    case "b88458bf2c25d3a34ab57ee149f36cfdc6b8a5138d5c6ed147fbea008b4659db":
      return "10.07";
    
    case "08bd07ab3313e3f00b922538516a61b5846cde34c74ebc0020cd1a0b557dd54b":
      return "10.13";

    default:
      return false;
  }
}

// Takes in an ImageData object, and returns a Uint8Array object containing the
// data in little-endian RGB565 format. Optionally supports applying ordered
// dithering to the input...
function imageDataToRgb565(input, dither = false, ditherStrength = 0.2) {

  // Pre-define a Bayer 8x8 matrix for ordered dithering (if enabled); also,
  // this matrix was shamelessly yoinked from the Wikipedia example!
  const bayerMatrix = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ];

  // Loop through the image data, and convert it to little-endian RGB565. First,
  // we'll store the raw RGB565-converted integers in an array, one entry per
  // pixel...
  const intArray = [];
  for (let i = 0; i < input.data.length; i += 4){

    // Read in the raw source RGB colours from the image data stream...
    let red = input.data[i];
    let green = input.data[i+1];
    let blue = input.data[i+2];

    // Check if we're going to dither or not...
    if (dither) {

      // We are! The ordered dither algorithm is kinda messy, but essentially we
      // just end up slightly brightening/darkening our source colour pixels,
      // using the matrix defined above - this essentially adds a kind of
      // "noise" to the image, which stops banding being as apparent when
      // dropping down to RGB565. The first thing we need to do is calculate our
      // X and Y coordinates within the Bayer matrix for the current source
      // image pixel...
      const bayerX = (i / 4) % input.width % 8;
      const bayerY = (Math.floor(i / 4 / input.width)) % 8;

      // The Wikipedia Bayer matrix was designed to work with colour values that
      // range from 0 to 63... which is great for our RGB565 green colour
      // channel, but not for red or blue - so we scale the matrix values to
      // range from 0 to 31 for those two colour channels. Also, we want to both
      // lighten *and* darken our source input values, so to do that we subtract
      // roughly half the *possible* maximum from each value - 16 for red and
      // blue (half of 31, rounded up), and 32 for green (half of 63, rounded
      // up); note I'm using actual values of 18 and 36 instead of 16 and 32, as
      // I found that the Wikipedia matrix tended towards lightening more than
      // darkening, so I'm compensating by offsetting downwards a little more...
      const bayerValueRedBlue = (bayerMatrix[bayerY][bayerX] / 63 * 31) - 18;
      const bayerValueGreen = bayerMatrix[bayerY][bayerX] - 36;

      // Now we apply the ordered dithering itself; basically this "adds" the
      // Bayer matrix values to red, green and blue (which might lighten or
      // darken the pixel, depending on the specific value), and then uses that
      // value as a percentage of 255 (the highest possible value) to scale our
      // *actual* RGB565 output values for the pixel (which is a maximum of 31
      // for red and blue, and 63 for green). We also scale the whole effect by
      // ditherStrength, so that we can adjust how strong or weak the overall
      // dithering noise is (too strong and its distracting, too weak and it
      // mightn't effectively cover up banding in the output image). We scale
      // the green colour channel half as much as red and blue, as otherwise at
      // high dither strengths the image would take on an increasingly green
      // color cast...
      red =   Math.round(31 * (Math.min(255, Math.max(0, red   + (bayerValueRedBlue * ditherStrength))) / 255));
      green = Math.round(63 * (Math.min(255, Math.max(0, green + (bayerValueGreen   * ditherStrength * 0.5))) / 255));
      blue =  Math.round(31 * (Math.min(255, Math.max(0, blue  + (bayerValueRedBlue * ditherStrength))) / 255));

      // As a result of the multiplying above, it's possible our red, green and
      // blue values are now outside of the 0-31/63 ranges that are allowed for
      // our RGB565 output - so we need to clamp the values, just in case...
      red = Math.min(31, Math.max(0, red));
      green = Math.min(63, Math.max(0, green));
      blue = Math.min(31, Math.max(0, blue));

      // And finally, we take our values and convert them to an int representing
      // the RGB565 value, that will eventually be stuffed into our output
      // Uint8Array object...
      intArray[i / 4] = (red << 11) + (green << 5) + blue;
    }
    else {

      // We're not dithering, so all we need to do is use some shifting and
      // masking to get a big-endian version of the RGB565 colour and store it
      // in our array before moving on...
      intArray[i / 4] = ((red & 248)<<8) + ((green & 252)<<3) + (blue>>3);
    }
  }

  // Create a data buffer and a data view; we'll use the view to convert our int
  // array data to little-endian format (the "true" below) to be stored in the
  // buffer...
  const buffer = new ArrayBuffer(intArray.length * 2);
  const dataView = new DataView(buffer);
  for (let i = 0; i < intArray.length; i++) {
    dataView.setInt16(i * 2, intArray[i], true);
  }

  // Use the buffer to fill a Uint8Array, which we'll return...
  return new Uint8Array(buffer);
}

// Takes in an ImageData object, and returns a Uint8Array object containing the
// data in BGRA format...
function imageDataToBgra(input) {

  // This is pretty simple - we just loop through the input data (which is in
  // RGBA format), and swap the Red and Blue channels to output BGRA instead...
  const output = new Uint8Array(input.data.length);
  for (let i = 0; i < input.data.length; i += 4) {
    output[i]     = input.data[i + 2];
    output[i + 1] = input.data[i + 1];
    output[i + 2] = input.data[i];
    output[i + 3] = input.data[i + 3];
  }
  return output;
}

// Takes in a Uint8Array object containing little-endian RGB565 image data, a
// width and a height, and outputs an ImageData object...
function rgb565ToImageData(input, width, height) {

  // Create an output ImageData object of the specified dimensions; it'll
  // default to transparent black, but we'll fill it with our input data...
  const output = new ImageData(width, height);
  let outputIndex = 0;
  for (let i = 0; i < input.length; i += 2) {

    // Check to make sure we haven't run out of space in our output buffer...
    if (outputIndex < output.data.length) {

      // Read in two bytes, representing one RGB565 pixel in little-endian
      // format...
      const byte1 = input[i];
      const byte2 = input[i + 1];

      // Extract the red, green and blue components from them. The first five
      // bits of byte2 are red, the first three bits of byte1 and the last
      // three bits of byte 2 are green, and the last five bits of byte1 are
      // blue...
      let red = (byte2 & 0b11111000) >> 3;
      let green = ((byte1 & 0b11100000) >> 5) | ((byte2 & 0b00000111) << 3);
      let blue = byte1 & 0b00011111;

      // These values are in 5-bit/6-bit ranges; we need to scale them to 8-bit
      // ranges for the colours to look right...
      red = Math.round(red * 255 / 31);
      green = Math.round(green * 255 / 63);
      blue = Math.round(blue * 255 / 31);

      // Finally, store the RGB values in our ImageData's data array, being
      // sure to set the A component to 255...
      output.data[outputIndex] = red;
      output.data[outputIndex + 1] = green;
      output.data[outputIndex + 2] = blue;
      output.data[outputIndex + 3] = 255;
      outputIndex += 4;
    }
    else {

      // Oops, we've run out of room in our output data buffer; no point in
      // trying to process any more input data!
      break;
    }
  }

  // If we've run out of input data, but haven't reached the end of our
  // ImageData object's buffer, fill the rest of that buffer with white...
  while (outputIndex / 4 < width * height) {
    output.data[outputIndex] = 255;
    output.data[outputIndex + 1] = 255;
    output.data[outputIndex + 2] = 255;
    output.data[outputIndex + 3] = 255;
    outputIndex += 4;
  }

  // Finally, return our ImageData object...
  return output;
}

// Takes in a Uint8Array object containing raw BGRA image data, a width and a
// height, and outputs an ImageData object...
function bgraToImageData(input, width, height) {

  // Create an output ImageData object of the specified dimensions; it'll
  // default to transparent black, but we'll fill it with our input data...
  const output = new ImageData(width, height);
  let outputIndex = 0;
  for (let i = 0; i < input.length; i += 4) {

    // Check to make sure we haven't run out of space in our output buffer...
    if (outputIndex < output.data.length) {

      // The input data is *nearly* RGBA as it is - it's just that the R and B
      // colour channels are swapped... so, just swap them back!
      output.data[i]     = input[i + 2];
      output.data[i + 1] = input[i + 1];
      output.data[i + 2] = input[i];
      output.data[i + 3] = input[i + 3];
      outputIndex += 4;
    }
    else {

      // Oops, we've run out of room in our output data buffer; no point in
      // trying to process any more input data!
      break;
    }
  }

  // If we've run out of input data, but haven't reached the end of our
  // ImageData object's buffer, fill the rest of that buffer with white...
  while (outputIndex / 4 < width * height) {
    output.data[outputIndex] = 255;
    output.data[outputIndex + 1] = 255;
    output.data[outputIndex + 2] = 255;
    output.data[outputIndex + 3] = 255;
    outputIndex += 4;
  }

  // Finally, return our ImageData object...
  return output;
}

// This function takes in a Javascript Image object, and outputs it as an
// ImageData object instead...
function imageToImageData(image, keepAlpha = true) {

  // Create a virtual canvas, and load it up with our image file...
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw our image to the canvas, which will allow us to get data about the
  // image. If the user doesn't want to keep the alpha channel, draw the image
  // on a black background...
  if (!keepAlpha) {
    context.fillStyle = "black";
    context.fillRect(0, 0, image.width, image.height);
  }
  context.drawImage(image, 0, 0, image.width, image.height);
  const imageData = context.getImageData(0, 0, image.width, image.height);

  // Return the ImageData object...
  return imageData;
}

// This function takes in an ImageData object "input", and returns a new
// ImageData object containing a scaled version of the original image resized to
// "newWidth" and "newHeight". Two different scaling methods are supported:
// "Nearest Neighbour", and "Bilinear", although specifically when downscaling,
// "Bilinear" is just a friendly name for two different scaling
// filters/techniques that are used in a hybrid approach - halve-to-target, and
// Hermite interpolation...
function scaleImage(input, newWidth, newHeight, method, downscaleFilter = "hermite") {

  // Utility function which takes in an ImageData object, and returns a scaled
  // version using bilinear filtering...
  function _bilinear(imageData, newWidth, newHeight) {

    // Just in case, let's check to see if imageData's dimensions are already at
    // the target width and height - if they are, there's no need to do anything
    // to it, and we can just return it as-is...
    if (imageData.width == newWidth && imageData.height == newHeight) {
      return imageData;
    }

    // If we're here, then nope - we have some scaling to do! Create a canvas
    // object and draw our input ImageData object to it...
    const inputCanvas = document.createElement("canvas");
    const inputContext = inputCanvas.getContext("2d");
    inputCanvas.width = imageData.width;
    inputCanvas.height = imageData.height;
    inputContext.putImageData(imageData, 0, 0);

    // Create another canvas object with the target dimensions, and draw the
    // inputCanvas to it at target dimensions; this utilises the browser's
    // native bilinear filtering...
    const outputCanvas = document.createElement("canvas");
    const outputContext = outputCanvas.getContext("2d");
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = "high";
    outputCanvas.width = newWidth;
    outputCanvas.height = newHeight;
    outputContext.drawImage(inputCanvas, 0, 0, inputCanvas.width, inputCanvas.height, 0, 0, newWidth, newHeight);

    // Return an ImageData object pulled from the output canvas...
    return outputContext.getImageData(0, 0, newWidth, newHeight);
  }

  // Utility function which takes in an ImageData object, and returns a
  // downscaled version using a technique that involves downscaling the input's
  // width and height repeatedly by half until doing so again would take the
  // image below the target dimensions. The result is then blended with the next
  // scale down based on how close the target dimensions are to the current or
  // next scale - this essentially gives an effect like mip-mapping in 3D games.
  // This method is fast, doesn't introduce image distortion, and works great
  // with alpha channels... but can give "soft" images if the target image
  // dimensions are just under native scale (or a 50% downscale threshold), and
  // can give a "harsh" image if the target dimensions are just above a
  // downscale threshold. I try to mitigate the latter by blending in an
  // additional downscale when we get close to a downscale threshold. This
  // function and sub-functions are based on the following JSFiddle code, but
  // with my own modifications: https://jsfiddle.net/1b68eLdr/93089/
  function _halveToTarget(imageData, newWidth, newHeight) {

    // This sub-function takes two ImageData objects (assumed to be of identical
    // dimensions) and blends their RGBA data together based on the passed-in
    // amount (between 0 and 1 inclusive) of how much of imageDataOne should be
    // in the blend. An amount of 1 means the result will be purely
    // imageDataOne, while an amount of 0 means the result will be purely
    // imageDataTwo. Numbers between 0 and 1 will give an appropriate mix of the
    // two. The result of the blend is then returned as an ImageData object...
    function blendImageDatas(imageDataOne, imageDataTwo, amountImageDataOne){
      const blendedData = new ImageData(imageDataOne.width, imageDataOne.height);
      const amountImageDataTwo = 1 - amountImageDataOne;
      for (let i = 0; i < imageDataOne.data.length; i += 4) {
        blendedData.data[i    ] = (imageDataOne.data[i    ] * amountImageDataOne) + (imageDataTwo.data[i    ] * amountImageDataTwo);
        blendedData.data[i + 1] = (imageDataOne.data[i + 1] * amountImageDataOne) + (imageDataTwo.data[i + 1] * amountImageDataTwo);
        blendedData.data[i + 2] = (imageDataOne.data[i + 2] * amountImageDataOne) + (imageDataTwo.data[i + 2] * amountImageDataTwo);
        blendedData.data[i + 3] = (imageDataOne.data[i + 3] * amountImageDataOne) + (imageDataTwo.data[i + 3] * amountImageDataTwo);
      }
      return blendedData;
    }

    // First, let's just copy imageData, and work on the copy instead - just in
    // case we don't want to modify the input directly (it's passed by reference
    // because it's an object - thanks JavaScript!)
    let inputData = new ImageData(imageData.width, imageData.height);
    inputData.data.set(imageData.data);

    // Now let's reduce the input's width and height (independently) until doing
    // so again would take the input's dimensions below the target dimensions;
    // we'll use plain-old browser bilinear filtering to do this...
    while (newWidth <= Math.round(inputData.width * 0.5)) {
      inputData = _bilinear(inputData, Math.round(inputData.width * 0.5), inputData.height);
    }
    while (newHeight <= Math.round(inputData.height * 0.5)) {
      inputData = _bilinear(inputData, inputData.width, Math.round(inputData.height * 0.5));
    }

    // Now, inputData either exactly matches the dimensions of newWidth AND
    // newHeight (in which case we're done), OR one or more of inputData's
    // dimensions is greater than newWidth/newHeight. In that case, we want to
    // generate the next level down for the dimensions that't aren't equal, and
    // then blend between inputData (which is too detailed) and the next level
    // down (which is too soft) based on how far away from the next level down
    // we are - this essentially gives an effect like mip-mapping, and will help
    // to ensure that transitions across 50% downscale thresholds aren't too
    // jarring...
    if (newWidth < inputData.width || newHeight < inputData.height) {

      // OK, one or more of inputData's dimensions is greater than
      // newWidth/newHeight, so we're going to be doing some blending. First we
      // need to generate the next scale of image downwards - just like before,
      // we'll do each dimension separately...
      let blendData = new ImageData(inputData.width, inputData.height);
      blendData.data.set(inputData.data);
      if (newWidth < inputData.width) {
        blendData = _bilinear(blendData, Math.round(blendData.width * 0.5), blendData.height);
      }
      if (newHeight < inputData.height) {
        blendData = _bilinear(blendData, blendData.width, Math.round(blendData.height * 0.5));
      }

      // Now we have the next level of downscale, we need to work out where
      // our target width and height lie between inputData's width and height,
      // and blendData's width and height - that'll tell us what proportion of
      // each image should be in the final blend between the two. Once we've
      // worked that out, we blend inputData with blendData accordingly
      // (blendData gets upscaled to inputData's resolution first, to make the
      // blending less complicated)...
      let axisBeingBlended = 0;
      let widthFactor = 0;
      let heightFactor = 0;
      if (inputData.width - blendData.width != 0) {
        widthFactor = (newWidth - blendData.width) / (inputData.width - blendData.width);
        axisBeingBlended += 1;
      }
      if (inputData.height - blendData.height != 0) {
        heightFactor = (newHeight - blendData.height) / (inputData.height - blendData.height);
        axisBeingBlended += 1;
      }
      inputData = blendImageDatas(inputData, _bilinear(blendData, inputData.width, inputData.height), (widthFactor + heightFactor) / axisBeingBlended);
    }

    // Finally, return imageData as scaled to the final desired width and height
    // (it may not currently exactly those dimensions)...
    return _bilinear(inputData, newWidth, newHeight);
  }

  // Utility function that takes in an ImageData object, and returns a
  // downscaled version using a technique called Hermite interpolation. This
  // method is a little slow, produces very high-quality output and works great
  // with alpha channels... but it can introduce a little image distortion with
  // high-frequency inputs, as well as some light aliasing on very fine details.
  // To mitigate this, I've modified it to use a hybrid approach - I scale the
  // image image to twice the target width and height using _halveToTarget
  // (defined above), even if this means upscaling the input image first, and
  // *then* I downscale the result using Hermite interpolation. The result is a
  // bit slower again (as the input gets rescaled several times), but produced
  // excellent results with zero distortion across all of my test images, even
  // those with huge downscale ratios and very fine details (starfields). The
  // core of this function is based on the following JSFiddle code, but again
  // with some modifications by myself: https://jsfiddle.net/9g9Nv/442/
  function _hermite(imageData, newWidth, newHeight){

    // So the very first thing we do is rescale the input to twice the desired
    // width and height using _halveToTarget and bilinear filtering (which may
    // involve upscaling the input), before we use Hermite interpolation to
    // downscale to the final target resolution - this hybrid approach appears
    // to give excellent results for a slight speed penalty. We just call our
    // main scaleImage() function, and force it to use "halveToTarget" instead
    // of the default "hermite" method (don't want to be stuck in an infinite
    // loop!). We'll do all our work on a copy of the input, just in case
    // we don't want to modify that in the calling code...
    let inputData = new ImageData(imageData.width, imageData.height);
    inputData.data.set(imageData.data);
    inputData = scaleImage(inputData, newWidth * 2, newHeight * 2, "Bilinear", "halveToTarget");

    // OK, now it's on to the main Hermite interpolation; thanks to the original
    // author of the JSFiddle! I've just cleaned up their code a little to fit
    // within my use-case here. I'm not a "maths" person, and so the
    // underpinnings of Hermite interpolation go over my head (I'm talking about
    // the Wikipedia article here)... but from reading the code below, what I
    // believe is happening is that it loops through the input data, and breaks
    // it up into little rectangular chunks, where each chunk will become one
    // pixel in the output image. It goes through each pixel of the chunk, and
    // accumulates a weighted version of its RGBA data into a buffer (the gr_X
    // variables). Once it's finished going through the chunk, it takes the
    // accumulation buffer and uses the total weight to calculate a final RGBA
    // for the matching pixel in the output buffer and stores it. The bit that's
    // over my head is why the weighting is calculated the way it is... I'll
    // leave that as an exercise to the more mathematically inclined, and just
    // say silent thanks to the JSFiddle author again! I've renamed their
    // original variables to match my own understanding as best I can, in case
    // it helps to parse it a bit better...
    const ratioWidth = inputData.width / newWidth;
    const ratioWidthHalf = Math.ceil(ratioWidth / 2);
    const ratioHeight = inputData.height / newHeight;
    const ratioHeightHalf = Math.ceil(ratioHeight / 2);
    const output = new ImageData(newWidth, newHeight);

    // Loop through our desired output (as we're calculating the final value
    // of each output pixel directly)...
    for (let outputY = 0; outputY < newHeight; outputY++) {
      for (let outputX = 0; outputX < newWidth; outputX++) {

        let currentWeight = 0;
        let totalWeightRGB = 0;
        let totalWeightAlpha = 0;
        let accumulatorRed = 0;
        let accumulatorGreen = 0;
        let accumulatorBlue = 0;
        let accumulatorAlpha = 0;
        const center_y = (outputY + 0.5) * ratioHeight;

        // Calculate the borders of the "chunk" of input that'll be weighted
        // down to a single output pixel...
        const inputChunkLeftEdge = Math.floor(outputX * ratioWidth);
        const inputChunkRightEdge = Math.min(Math.ceil((outputX + 1) * ratioWidth), inputData.width);
        const inputChunkTopEdge = Math.floor(outputY * ratioHeight);
        const inputChunkBottomEdge = Math.min(Math.ceil((outputY + 1) * ratioHeight), inputData.height);

        // Now loop through the input rows within that chunk...
        for (let inputY = inputChunkTopEdge; inputY < inputChunkBottomEdge; inputY++) {

          // These three lines I'm not sure about, to be honest...
          const dy = Math.abs(center_y - (inputY + 0.5)) / ratioHeightHalf;
          const center_x = (outputX + 0.5) * ratioWidth;
          const w0 = dy * dy;

          // And loop through the input columns within those rows...
          for (let inputX = inputChunkLeftEdge; inputX < inputChunkRightEdge; inputX++) {

            // Again, these lines are similar to the three above; I know "w" is
            // used in the Hermite weighting calculation...
            const dx = Math.abs(center_x - (inputX + 0.5)) / ratioWidthHalf;
            const w = Math.sqrt(w0 + dx * dx);
            if (w >= 1) {
              continue;
            }

            // This line is where the Hermite weighting is calculated...
            currentWeight = 2 * w * w * w - 3 * w * w + 1;

            // Now we use the weighting to fractions of the source pixel RGBA
            // data in our accumulators; we also add the weight of the current
            // pixel to a weight accumulator...
            const pos_x = 4 * (inputX + inputY * inputData.width);
            accumulatorAlpha += currentWeight * inputData.data[pos_x + 3];
            totalWeightAlpha += currentWeight;
            if (inputData.data[pos_x + 3] < 255) {
              currentWeight = currentWeight * inputData.data[pos_x + 3] / 250;
            }
            accumulatorRed += currentWeight * inputData.data[pos_x];
            accumulatorGreen += currentWeight * inputData.data[pos_x + 1];
            accumulatorBlue += currentWeight * inputData.data[pos_x + 2];
            totalWeightRGB += currentWeight;
          }
        }

        // Now that we've finished accumulating the weighted RGBA data for that
        // entire source "chunk", we divide it by the total weight and store the
        // result in our output ImageData object...
        const pixelIndex = (outputX + outputY * newWidth) * 4;
        output.data[pixelIndex    ] = accumulatorRed / totalWeightRGB;
        output.data[pixelIndex + 1] = accumulatorGreen / totalWeightRGB;
        output.data[pixelIndex + 2] = accumulatorBlue / totalWeightRGB;
        output.data[pixelIndex + 3] = accumulatorAlpha / totalWeightAlpha;
      }
    }
    
    // And that's it - output now contains the downscaled image, so return it!
    return output;
  }

  // Before we consider doing *any* scaling, let's check to make sure the new
  // dimensions are different from the old ones; if they're not, there's no
  // point in doing any scaling!
  if (input.width == newWidth && input.height == newHeight) {
    return input;
  }

  // If we're here, then we're really scaling; the process to follow is
  // *heavily* dependent upon the provided method, so let's switch based on
  // that...
  switch (method) {

    // If the method is "Nearest Neighbour"...
    case "Nearest Neighbour":

      // Create a new ImageData object to store the scaled pixel data...
      const outputData = new ImageData(newWidth, newHeight);

      // Loop through each pixel of the new image...
      for (let outputY = 0; outputY < newHeight; outputY++) {
        for (let outputX = 0; outputX < newWidth; outputX++) {

          // Calculate the index of the new pixel in the output data...
          const outputIndex = (outputY * newWidth + outputX) * 4;

          // Calculate the x and y coordinates of the corresponding pixel in
          // the original image, and it's index within input's data...
          const inputX = Math.floor(outputX * input.width / newWidth);
          const inputY = Math.floor(outputY * input.height / newHeight);
          const inputIndex = (inputY * input.width + inputX) * 4;

          // Copy the color values from the input pixel to the output pixel...
          outputData.data[outputIndex]     = input.data[inputIndex];     // Red
          outputData.data[outputIndex + 1] = input.data[inputIndex + 1]; // Green
          outputData.data[outputIndex + 2] = input.data[inputIndex + 2]; // Blue
          outputData.data[outputIndex + 3] = input.data[inputIndex + 3]; // Alpha
        }
      }

      // Finally, return the scaled ImageData object...
      return outputData;
      break;

    // If the method is "Bilinear"...
    case "Bilinear":

      // OK, "Bilinear" is a bit of a lie... bilinear filtering is fine when
      // you're *upscaling* an image, but if you're *downscaling* an image
      // by more than half the original's width/height, then true bilinear
      // filtering creates just as much of an aliased mess as nearest
      // neighbour filtering once you get down to downscaling by more than half
      // the dimensions of the original image. Most image editing apps therefore
      // cheat and use a resampling algorithm when downscaling, and bilinear
      // filtering when upscaling... so that's what we're going to do here too!
      // We'll use a hybrid of bilinear and Hermite interpolation for any image
      // axis that's being downscaled, and bilinear for any axis that's being
      // upscaled; this should give the user a result that's much closer to what
      // they'd expect to see from a graphics app like Photoshop or similar...
      let upscaling = false, downscaling = false;
      if (newWidth > input.width || newHeight > input.height) { upscaling = true; }
      if (newWidth < input.width || newHeight < input.height) { downscaling = true; }

      // Now we'll process the image differently depending on whether or not
      // we're only upscaling, only downscaling, or doing a mix of upscaling and
      // downscaling. In the case of a mix, we do the upscaling part first, and
      // the downscaling part second, as it'll give a slightly sharper result...
      if (upscaling && !downscaling) {
        // Upscale only...
        return _bilinear(input, newWidth, newHeight);
      }
      else if (downscaling && !upscaling) {
        // Downscale only - run the input through either our halve-to-target or
        // Hermite filter...
        switch (downscaleFilter){
          case "hermite":
            return _hermite(input, newWidth, newHeight);
            break;
          case "halveToTarget":
            return _halveToTarget(input, newWidth, newHeight);
            break;
        }
      }
      else {
        // Both upscaling and downscaling... do the upscale first, then send the
        // result back to this function again for downscaling...
        let partiallyScaled;
        if (newWidth > input.width) {
          // Upscale width
          partiallyScaled = _bilinear(input, newWidth, input.height);
        }
        else {
          // Upscale height
          partiallyScaled = _bilinear(input, input.width, newHeight);
        }
        // Downscale the rest...
        return scaleImage(partiallyScaled, newWidth, newHeight, method, downscaleFilter);
      }
      break;
  }
}

// This utility function is used for adding info, warning and error messages to
// the appropriate spots in my tools...
function setMessage(type, divID, text) {
  let icon = "";
  switch(type) {
    case "info":
      icon = "ℹ️";
      break;

    case "warning":
      icon = "⚠️";
      break;

    case "error":
      icon = "🛑";
      break;
  }
  document.getElementById(divID).innerHTML = "<p class=\"" + type + "\">" + icon + " " + text + "</p>";
}