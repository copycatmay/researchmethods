$(document).ready(function () {
  console.log("Script loaded");

  // Wait for all images to load before positioning them
  let imagePromises = $(".random-image")
    .map(function () {
      return new Promise((resolve, reject) => {
        if (this.complete) {
          resolve();
        } else {
          $(this).on("load", resolve);
          $(this).on("error", reject);
        }
      });
    })
    .get();

  Promise.all(imagePromises)
    .then(() => {
      console.log("all images loaded successfully");
      positionImages();
    })
    .catch((error) => {
      console.error("error loading images:", error);
    });

  function positionImages() {
    console.log("positionImages called");
    $(".random-image").each(function () {
      let x = Math.random() * 65; // use vw units
      let y = Math.random() * 40; // use vh units
      let zIndex = Math.floor(Math.random() * 100);
      let sizeVariation = 0.8 + Math.random() * 0.4; // 80% to 120% of original size
      let newWidth = 15 * sizeVariation; // 15vw is the original width

      let $container = $("<div>")
        .addClass("image-container")
        .css({
          position: "absolute",
          left: x + "vw",
          top: y + "vh",
          zIndex: zIndex,
          width: newWidth + "vw",
        });

      $(this)
        .css({
          width: "100%",
          height: "auto",
          transform: "scale(" + sizeVariation + ")",
        })
        .wrap($container);

      let $caption = $("<div>")
        .addClass("image-caption")
        .text($(this).data("caption"));
      $container.append($caption);
    });
  }

  function showResponse(responseId) {
    console.log("showResponse called with id:", responseId);
    $("#mainContent").removeClass("active").addClass("inactive");
    $(".response-content").removeClass("active");
    $("#" + responseId).addClass("active");
  }

  function showMain() {
    console.log("showMain called");
    $("#mainContent").removeClass("inactive").addClass("active");
    $(".response-content").removeClass("active");
  }

  positionImages();

  $("#nav a").on("click", function (e) {
    console.log("Nav link clicked");
    e.preventDefault();
    let responseId = $(this).data("response");
    showResponse(responseId);
  });

  $(".back-button").on("click", function (e) {
    console.log("Back button clicked");
    e.preventDefault();
    showMain();
  });

  $(window).on("resize", positionImages);

  // Add this new code for the toggle button functionality
  $("#toggleImages").click(function () {
    let $button = $(this);
    let $images = $(".image-container");

    if ($images.is(":visible")) {
      $images.hide();
      $button.text("Show Images");
    } else {
      $images.show();
      $button.text("Hide Images");
    }
  });
});
