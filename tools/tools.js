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
  var c;
  var tabCRC32 = new Int32Array(256);
  for (var i = 0; i < 256; i++) {
    c = i << 24;
    for (var j = 0; j < 8; j++) {
      c = c & (1 << 31) ? c << 1 ^ 0x4c11db7 : c << 1;
    }
    tabCRC32[i] = c;
  }
  c = ~0;
  for (var i = 512; i < data.length; i++) {
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
  var dataCopy = data.slice();

  // Only really worthwhile doing this for big bisrv.asd files...
  if (dataCopy.length > 12600000) {

    // First, replace CRC32 bits with 00...
    dataCopy[396] = 0x00;
    dataCopy[397] = 0x00;
    dataCopy[398] = 0x00;
    dataCopy[399] = 0x00;

    // Next identify the boot logo position, and blank it out too...
    var badExceptionOffset = findSequence([0x62, 0x61, 0x64, 0x5F, 0x65, 0x78, 0x63, 0x65, 0x70, 0x74, 0x69, 0x6F, 0x6E, 0x00, 0x00, 0x00], dataCopy);
    if (badExceptionOffset > -1) {
      var bootLogoStart = badExceptionOffset + 16;
      for (var i = bootLogoStart; i < (bootLogoStart + 204800); i++) {
        dataCopy[i] = 0x00;
      }
    }
    else {
      return false;
    }

    // Next identify the emulator button mappings (if they exist), and blank
    // them out too...
    var preButtonMapOffset = findSequence([0x00, 0x00, 0x00, 0x71, 0xDB, 0x8E, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], dataCopy);
    if (preButtonMapOffset > -1) {
      var postButtonMapOffset = findSequence([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00], dataCopy, preButtonMapOffset);
      if (postButtonMapOffset > -1) {
        for (var i = preButtonMapOffset + 16; i < postButtonMapOffset; i++) {
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

    // Next we'll look for (and zero out) the five bytes that the power
    // monitoring functions of the SF2000 use for switching the UI's battery
    // level indicator. These unfortunately can't be searched for - they're just
    // in specific known locations for specific firmware versions...
    var prePowerCurve = findSequence([0x11, 0x05, 0x00, 0x02, 0x24], dataCopy);
    if (prePowerCurve > -1) {
      var powerCurveFirstByteLocation = prePowerCurve + 5;
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
      
        default:
          return false;
      }
    }
    else {
      return false;
    }

    // Next we'll look for and zero out the bytes used for SNES audio rate and
    // CPU cycles, in case folks want to patch those bytes to correct SNES
    // first-launch issues on newer firmwares...
    var preSNESBytes = findSequence([0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x80], dataCopy);
    if (preSNESBytes > -1) {
      var snesAudioBitrateBytes = preSNESBytes + 8;
      var snesCPUCyclesBytes = snesAudioBitrateBytes + 8;
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
      var array = Array.from(new Uint8Array(digest));
      var hash = array.map(byte => ("00" + byte.toString(16)).slice(-2)).join("");
      return hash;
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
function findSequence(needle, haystack, offset) {

  // If offset is not provided, default to 0...
  offset = offset || 0;

  // Loop through the haystack array starting from the offset...
  for (var i = offset; i < haystack.length - needle.length + 1; i++) {

    // Assume a match until proven otherwise...
    var match = true;

    // Loop through the needle array and compare each byte...
    for (var j = 0; j < needle.length; j++) {

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
  var link = document.createElement("a");
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

    default:
      return false;
  }
}

// Takes in an ImageData object, and returns a Uint8Array object containing the
// data in little-endian RGB565 format...
function imageDataToRgb565(input) {

  // Loop through the image data, and convert it to little-endian RGB565. First,
  // we'll store the raw RGB565-converted integers in an array, one entry per
  // pixel...
  var intArray = [];
  var pixelCount = 0;
  for (var i = 0; i < input.data.length; i += 4){

    // Read in the raw source RGB colours from the image data stream...
    var red = input.data[i];
    var green = input.data[i+1];
    var blue = input.data[i+2];

    // Use some shifting and masking to get a big-endian version of the RGB565
    // colour and store it in our array before moving on...
    intArray[pixelCount] = ((red & 248)<<8) + ((green & 252)<<3) + (blue>>3);
    pixelCount++;
  }

  // Create a data buffer and a data view; we'll use the view to convert our int
  // array data to little-endian format (the "true" below) to be stored in the
  // buffer...
  var buffer = new ArrayBuffer(intArray.length * 2);
  var dataView = new DataView(buffer);
  for (var i = 0; i < intArray.length; i++) {
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
  output = new Uint8Array(input.data.length);
  for (var i = 0; i < input.data.length; i += 4) {
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
  output = new ImageData(width, height);
  outputIndex = 0;
  for (var i = 0; i < input.length; i += 2) {

    // Check to make sure we haven't run out of space in our output buffer...
    if (outputIndex < output.data.length) {

      // Read in two bytes, representing one RGB565 pixel in little-endian
      // format...
      var byte1 = input[i];
      var byte2 = input[i + 1];

      // Extract the red, green and blue components from them. The first five
      // bits of byte2 are red, the first three bits of byte1 and the last
      // three bits of byte 2 are green, and the last five bits of byte1 are
      // blue...
      var red = (byte2 & 0b11111000) >> 3;
      var green = ((byte1 & 0b11100000) >> 5) | ((byte2 & 0b00000111) << 3);
      var blue = byte1 & 0b00011111;

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
  output = new ImageData(width, height);
  outputIndex = 0;
  for (var i = 0; i < input.length; i += 4) {

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
function imageToImageData(image) {

  // Create a virtual canvas, and load it up with our image file...
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw our image to the canvas, which will allow us to get data about the
  // image...
  context.drawImage(image, 0, 0, image.width, image.height);
  var imageData = context.getImageData(0, 0, image.width, image.height);

  // Return the ImageData object...
  return imageData;
}

// This function takes in an ImageData object, and returns a new ImageData
// object containing a scaled version of the original image. The new image's
// width, height and scaling method are also specified...
function scaleImage(input, newWidth, newHeight, method) {

  // Utility function which takes in an ImageData object, and returns
  // a (partially) upscaled version using bilinear filtering...
  function _bilinear(imageData, newWidth, newHeight) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);

    var outCanvas = document.createElement("canvas");
    var outContext = outCanvas.getContext("2d");
    outContext.imageSmoothingEnabled = true;
    outContext.imageSmoothingQuality = "high";
    outCanvas.width = newWidth;
    outCanvas.height = newHeight;
    outContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

    return outContext.getImageData(0, 0, newWidth, newHeight);
  }

  // Utility function which takes in an ImageData object, and returns
  // a (partially) downscaled version using gaussian resampling...
  // [Side note: I asked Bing AI for this function; ain't technology grand!]
  function _gaussian(imageData, newWidth, newHeight) {

    // Get the original width and height of the image data
    let oldWidth = imageData.width;
    let oldHeight = imageData.height;

    // Get the pixel data array of the image data
    let oldData = imageData.data;

    // Create a new pixel data array for the scaled image data
    let newData = new Uint8ClampedArray(newWidth * newHeight * 4);

    // Calculate the scaling factor along each axis
    let scaleX = newWidth / oldWidth;
    let scaleY = newHeight / oldHeight;

    // Calculate the radius of the Gaussian kernel based on the scaling factor
    let radiusX = Math.ceil(1 / scaleX);
    let radiusY = Math.ceil(1 / scaleY);

    // Calculate the size of the Gaussian kernel along each axis
    let sizeX = radiusX * 2 + 1;
    let sizeY = radiusY * 2 + 1;

    // Create a Gaussian kernel array
    let kernel = new Float32Array(sizeX * sizeY);

    // Calculate the standard deviation of the Gaussian distribution based on
    // the radius
    let sigmaX = radiusX / 3;
    let sigmaY = radiusY / 3;

    // Calculate the inverse of the variance of the Gaussian distribution along
    // each axis
    let invVarX = 1 / (2 * sigmaX * sigmaX);
    let invVarY = 1 / (2 * sigmaY * sigmaY);

    // Calculate the normalization factor for the Gaussian kernel
    let norm = Math.sqrt(2 * Math.PI * sigmaX * sigmaY);

    // Loop through each element in the Gaussian kernel array
    for (let ky = -radiusY; ky <= radiusY; ky++) {
      for (let kx = -radiusX; kx <= radiusX; kx++) {
        // Calculate the index of the element in the Gaussian kernel array
        let k = (ky + radiusY) * sizeX + (kx + radiusX);

        // Calculate the value of the element using the Gaussian formula
        kernel[k] = Math.exp(-(kx * kx) * invVarX - (ky * ky) * invVarY) / norm;
      }
    }

    // Loop through each pixel in the new image data
    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        // Calculate the corresponding coordinates in the old image data
        let oldX = x / scaleX;
        let oldY = y / scaleY;

        // Initialize the RGBA values of the pixel to zero
        let r7 = 0;
        let g7 = 0;
        let b7 = 0;
        let a7 = 0;

        // Initialize the sum of the kernel values to zero
        let sum = 0;

        // Loop through each element in the Gaussian kernel array
        for (let ky = -radiusY; ky <= radiusY; ky++) {
          for (let kx = -radiusX; kx <= radiusX; kx++) {
            // Calculate the index of the element in the Gaussian kernel array
            let k = (ky + radiusY) * sizeX + (kx + radiusX);

            // Get the value of the element in the Gaussian kernel array
            let w = kernel[k];

            // Calculate the coordinates of the pixel in the old image data that
            // corresponds to this element
            let x1 = Math.round(oldX + kx);
            let y1 = Math.round(oldY + ky);

            // Clamp the coordinates to the valid range
            x1 = Math.max(0, Math.min(x1, oldWidth - 1));
            y1 = Math.max(0, Math.min(y1, oldHeight - 1));

            // Get the index of the pixel in the old pixel data array
            let i1 = (y1 * oldWidth + x1) * 4;

            // Get the RGBA values of the pixel in the old pixel data array
            let r1 = oldData[i1];
            let g1 = oldData[i1 + 1];
            let b1 = oldData[i1 + 2];
            let a1 = oldData[i1 + 3];

            // Multiply the RGBA values by the kernel value and add them to the
            // pixel values
            r7 += r1 * w;
            g7 += g1 * w;
            b7 += b1 * w;
            a7 += a1 * w;

            // Add the kernel value to the sum
            sum += w;
          }
        }

        // Divide the RGBA values by the sum to get an average value
        r7 /= sum;
        g7 /= sum;
        b7 /= sum;
        a7 /= sum;

        // Round the RGBA values to integers
        r7 = Math.round(r7);
        g7 = Math.round(g7);
        b7 = Math.round(b7);
        a7 = Math.round(a7);

        // Get the index of the pixel in the new pixel data array
        let j = (y * newWidth + x) * 4;

        // Set the RGBA values of the pixel in the new pixel data array
        newData[j]     = r7;
        newData[j + 1] = g7;
        newData[j + 2] = b7;
        newData[j + 3] = a7;
      }
    }

    // Create and return a new ImageData object with the new pixel data array
    // and dimensions
    return new ImageData(newData, newWidth, newHeight);
  }

  // Get the original width and height...
  var width = input.width;
  var height = input.height;

  // Before we consider doing *any* scaling, let's check to make sure the new
  // dimensions are different from the old ones; if they're not, there's no
  // point in doing any scaling!
  if (width == newWidth && height == newHeight) {
    return input;
  }

  // If we're here, then we're really scaling; the process to follow is
  // *heavily* dependent upon the provided method, so let's switch based on
  // that...
  switch (method) {

    // If the method is "Nearest Neighbour"...
    case "Nearest Neighbour":

      // Create a new canvas element to draw the scaled image (we'll use the
      // canvas to get our output ImageData object)...
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");

      // Set the canvas size to the new dimensions...
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Create a new image data object to store the scaled pixel data...
      var scaledData = context.createImageData(newWidth, newHeight);

      // Loop through each pixel of the new image...
      for (var y = 0; y < newHeight; y++) {
        for (var x = 0; x < newWidth; x++) {

          // Calculate the index of the new pixel in the scaled data array...
          var index = (y * newWidth + x) * 4;

          // Calculate the x and y coordinates of the corresponding pixel in
          // the original image...
          var x2 = Math.floor(x * width / newWidth);
          var y2 = Math.floor(y * height / newHeight);

          // Calculate the index of the original pixel in the data array...
          var index2 = (y2 * width + x2) * 4;

          // Copy the color values from the original pixel to the new pixel...
          scaledData.data[index]     = input.data[index2];     // Red
          scaledData.data[index + 1] = input.data[index2 + 1]; // Green
          scaledData.data[index + 2] = input.data[index2 + 2]; // Blue
          scaledData.data[index + 3] = input.data[index2 + 3]; // Alpha
        }
      }

      // Finally, return the scaled ImageData object...
      return scaledData;

    // If the method is "Bilinear"...
    case "Bilinear":

      // OK, "Bilinear" is a bit of a lie... bilinear filtering is fine when
      // you're *upscaling* an image, but if you're *downscaling* an image
      // by more than half the original's width/height, then true bilinear
      // filtering creates just as much of an aliased mess as nearest
      // neighbour filtering. Most image editing apps therefore cheat and
      // use a resampling algorithm when downscaling, and bilinear filtering
      // when upscaling... so that's what we're going to do here too! We'll
      // use gaussian resampling for any image axis that's being downscaled,
      // and bilinear for any axis that's being upscaled; this should give
      // the user a result that's much closer to what they'd expect to see...

      // Let's see which kind of scaling scenario we're in...
      if (newWidth > width && newHeight > height) {

        // All dimensions being upscaled, so we'll use bilinear filtering for
        // everything...
        return _bilinear(input, newWidth, newHeight);
      }
      else if (newWidth < width && newHeight < height) {

        // All dimensions being downscaled, so we'll use gaussian resampling
        // for everything...
        return _gaussian(input, newWidth, newHeight);
      }
      else {

        // It's a mix!
        if (newWidth < width) {

          // Gaussian for width, bilinear for height...
          let partial = _gaussian(input, newWidth, height);
          return _bilinear(partial, newWidth, newHeight);
        }
        else if (newHeight < height) {

          // Gaussian for height, bilinear for width...
          let partial = _gaussian(input, width, newHeight);
          return _bilinear(partial, newWidth, newHeight);
        }
      }
      break;
  }
}

// This utility function is used for adding info, warning and error messages to
// the appropriate spots in my tools. It uses custom-modified versions of the
// SVG Famfamfam Silk icon set via https://github.com/frhun/silk-icon-scalable
function setMessage(type, divID, text) {
  var icon;
  switch(type) {
    case "info":
      icon = '<img class="icon" alt="An icon of a blue circle with a white lowercase letter I, indicating an informative message" aria-hidden="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgNjQgNjQnPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0nYSc+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjNDk5MWQyJyBzdG9wLW9wYWNpdHk9Jy45Jy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjMmU0NjgxJyBzdG9wLW9wYWNpdHk9Jy45NicvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHhsaW5rOmhyZWY9JyNhJyBpZD0nYycgeDE9JzEyJyB4Mj0nNTInIHkxPScxMicgeTI9JzUyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScvPjxsaW5lYXJHcmFkaWVudCBpZD0nYic+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjN2RhOWQ2Jy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjNWU4NWIzJy8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeGxpbms6aHJlZj0nI2InIGlkPSdkJyB4MT0nMTYnIHgyPSc0OCcgeTE9JzE2JyB5Mj0nNDgnIGdyYWRpZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJy8+PC9kZWZzPjxnIHBhaW50LW9yZGVyPSdtYXJrZXJzIHN0cm9rZSBmaWxsJz48Y2lyY2xlIGN4PSczMicgY3k9JzMyJyByPScyOCcgZmlsbD0ndXJsKCNjKScvPjxjaXJjbGUgY3g9JzMyJyBjeT0nMzInIHI9JzI0JyBmaWxsPScjYWVjNWUzJy8+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMjAnIGZpbGw9J3VybCgjZCknLz48cGF0aCBmaWxsPScjZmZmJyBkPSdNMjYgNDB2NGgxMnYtNGgtM1YyOGgtOHY0aDJ2OHpNMzUgMTloLTZ2Nmg2eicvPjwvZz48L3N2Zz4=">';
    break;

    case "warning":
      icon = '<img class="icon" alt="An icon of a yellow triangle with a dark orange exclamation point, indicating a warning or notice" aria-hidden="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgNjQgNjQnPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0nYSc+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjZTliYjNhJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjYzE2ODAzJy8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeGxpbms6aHJlZj0nI2EnIGlkPSdiJyB4MT0nMjAnIHgyPSc1NicgeTE9JzEyJyB5Mj0nNjAnIGdyYWRpZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJy8+PC9kZWZzPjxwYXRoIGZpbGw9JyNmZmYnIHN0cm9rZT0ndXJsKCNiKScgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLXdpZHRoPSc4JyBkPSdNNCA1Nmg1NkwzMiA4WicgcGFpbnQtb3JkZXI9J3N0cm9rZSBtYXJrZXJzIGZpbGwnLz48cGF0aCBmaWxsPScjZjVkODUyJyBkPSdNMTIgNTJoNDBMMzIgMThaJyBwYWludC1vcmRlcj0nbWFya2VycyBmaWxsIHN0cm9rZScvPjxwYXRoIGZpbGw9JyNjNTg3MTEnIGQ9J00yOSA0M3Y2aDZ2LTZ6TTI5IDQwaDZWMjZoLTZ6JyBwYWludC1vcmRlcj0nc3Ryb2tlIG1hcmtlcnMgZmlsbCcvPjwvc3ZnPg==">';
    break;

    case "error":
      icon = '<img class="icon" alt="An icon of a red circle with a white exclamation point, indicating an error has occurred" aria-hidden="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgNjQgNjQnPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0nYic+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjZjU4MTYyJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjZTI1ZjUzJy8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9J2EnPjxzdG9wIG9mZnNldD0nMCcgc3RvcC1jb2xvcj0nI2VjODE2YycvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI2JmNDMyOScvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHhsaW5rOmhyZWY9JyNhJyBpZD0nYycgeDE9JzEyJyB4Mj0nNTInIHkxPScxMicgeTI9JzUyJyBncmFkaWVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScvPjxsaW5lYXJHcmFkaWVudCB4bGluazpocmVmPScjYicgaWQ9J2QnIHgxPScyMCcgeDI9JzQ4JyB5MT0nMTYnIHkyPSc0NCcgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnLz48L2RlZnM+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMjgnIGZpbGw9J3VybCgjYyknIHBhaW50LW9yZGVyPSdtYXJrZXJzIHN0cm9rZSBmaWxsJy8+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMjQnIGZpbGw9JyNmOWQzY2MnIHBhaW50LW9yZGVyPSdtYXJrZXJzIHN0cm9rZSBmaWxsJy8+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMjAnIGZpbGw9J3VybCgjZCknIHBhaW50LW9yZGVyPSdtYXJrZXJzIHN0cm9rZSBmaWxsJy8+PHBhdGggZmlsbD0nI2ZmZicgZD0nTTI5IDE2djIwaDZWMTZaTTI5IDQwdjZoNnYtNnonIHBhaW50LW9yZGVyPSdmaWxsIG1hcmtlcnMgc3Ryb2tlJy8+PC9zdmc+">';
    break;
  }

  document.getElementById(divID).innerHTML = "<p class=\"" + type + "\">" + icon + " " + text + "</p>";

  return;
}