const track = document.querySelector("#image-track");

window.onmousedown = (e) => {
  console.log(e.clientX);
  track.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
  let percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  //   if (nextPercentage < -100) nextPercentage = -100;
  //   else if (nextPercentage > 0) nextPercentage = 0;
  nextPercentage = Math.max(-100, Math.min(0, nextPercentage));

  track.dataset.percentage = nextPercentage;

  //   track.style.transform = `translate(${nextPercentage}%, -50%)`;
  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (let image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${nextPercentage + 100}% 50%`;

    image.animate(
      {
        objectPosition: `${nextPercentage + 100}% 50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmouseup = (e) => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};
