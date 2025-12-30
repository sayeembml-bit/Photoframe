const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// Adjust these values based on your frame's transparent area
const frameConfig = {
  x: 70,
  y: 70,
  width: 360,
  height: 360
};

const frame = new Image();
frame.src = "frame.png"; // Replace with your actual frame image

upload.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const userImage = new Image();

  userImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = userImage.width / userImage.height;
    const frameRatio = frameConfig.width / frameConfig.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > frameRatio) {
      drawHeight = frameConfig.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = frameConfig.x - (drawWidth - frameConfig.width) / 2;
      offsetY = frameConfig.y;
    } else {
      drawWidth = frameConfig.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = frameConfig.x;
      offsetY = frameConfig.y - (drawHeight - frameConfig.height) / 2;
    }

    ctx.drawImage(userImage, offsetX, offsetY, drawWidth, drawHeight);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
  };

  userImage.src = URL.createObjectURL(file);
});

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "framed-photo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
