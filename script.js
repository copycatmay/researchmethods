$(document).ready(function () {
  console.log("Script loaded");

  // Add this line
  $("#toggleContainer").hide();

  // only hide image container once
  $("#imageContainer").hide();

  // load images in background
  let imagePromises = $(".random-image")
    .map(function () {
      $(this).css("opacity", "0"); // hide images initially
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
      $(".random-image").css("opacity", "1"); // show images smoothly
      positionImages();
    })
    .catch((error) => {
      console.error("error loading images:", error);
    });

  function positionImages() {
    console.log("positionImages called");
    $(".random-image").each(function () {
      let x = Math.random() * 65;
      let y = Math.random() * 40;
      let zIndex = Math.floor(Math.random() * 100);
      let sizeVariation = 0.8 + Math.random() * 0.4;
      let newWidth = 15 * sizeVariation;

      $(this).css({
        position: "absolute",
        left: x + "vw",
        top: y + "vh",
        zIndex: zIndex,
        width: newWidth + "vw",
        height: "auto",
        transform: "scale(" + sizeVariation + ")",
      });
    });
  }

  function showResponse(responseId) {
    console.log("showResponse called with id:", responseId);

    // check if clicking already selected response
    if ($(`#nav a[data-response="${responseId}"]`).hasClass("selected")) {
      // deselect everything and show main
      $("#nav a").removeClass("selected");
      $(".response-content").hide().removeClass("active");
      $("#imageContainer").hide();
      $("#toggleContainer").removeClass("visible").hide();
      $("#mainContent").removeClass("inactive").show().addClass("active");
      return;
    }

    // normal selection flow
    $("#nav a").removeClass("selected");
    $(`#nav a[data-response="${responseId}"]`).addClass("selected");

    $(".response-content").hide().removeClass("active");
    $("#" + responseId)
      .show()
      .addClass("active");

    if (responseId === "response1") {
      $("#imageContainer").show();
      $("#imageContainer2").hide();
      positionImages();
    } else if (responseId === "response2") {
      $("#imageContainer").hide();
      $("#imageContainer2").show();
      positionImages();
    } else {
      $("#imageContainer, #imageContainer2").hide();
    }
    $("#toggleContainer").show().addClass("visible");
  }

  function showMain() {
    console.log("showMain called");

    // remove selected state when going back to main
    $("#nav a").removeClass("selected");

    // existing animations
    $(".response-content").hide().removeClass("active");
    $("#mainContent").removeClass("inactive").show().addClass("active");

    // Add this line to hide toggle container when returning to main
    $("#toggleContainer").removeClass("visible").hide();
    $("#imageContainer").hide();
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
    let selectedResponse = $("#nav a.selected").data("response");
    let $images =
      selectedResponse === "response1"
        ? $("#imageContainer")
        : $("#imageContainer2");

    if ($images.is(":visible")) {
      $images.hide();
    } else if (
      selectedResponse === "response1" ||
      selectedResponse === "response2"
    ) {
      $images.show();
      positionImages();
    }
  });
});
