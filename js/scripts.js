document.addEventListener("DOMContentLoaded", function () {
  // Toggle search box
  document.getElementById("search-icon").addEventListener("click", function () {
    const searchBox = document.getElementById("search-box");
    searchBox.style.display =
      searchBox.style.display === "block" ? "none" : "block";
  });

  // Image gallery functionality
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".thumbnails img");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;
    });
  });

  // Radio button functionality for Add to Cart link
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const addToCart = document.getElementById("add-to-cart");
  radioButtons.forEach((button) => {
    button.addEventListener("change", function () {
      const flavor = document.querySelector(
        "input[name='flavor']:checked"
      ).value;
      const purchaseType = document.querySelector(
        "input[name='purchase']:checked"
      ).value;
      addToCart.href = `#cart?flavor=${flavor}&purchase=${purchaseType}`;
    });
  });

  // Stats counter animation
  const counters = document.querySelectorAll(".counter");
  function startCounter() {
    counters.forEach((counter) => {
      let count = 0;
      const target = parseInt(counter.getAttribute("data-target"));
      const interval = setInterval(() => {
        if (count >= target) clearInterval(interval);
        counter.innerText = count;
        count++;
      }, 20);
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      const statsSection = document.querySelector(".stats");
      const sectionPosition = statsSection.getBoundingClientRect().top;
      if (sectionPosition < window.innerHeight) {
        startCounter();
      }
    },
    { once: true }
  );

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  // Testimonial slider
  const slider = document.querySelector(".testimonial-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => (isDown = false));
  slider.addEventListener("mouseup", () => (isDown = false));
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".testimonial-wrapper");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let index = 0;
  const slidesToShow = 3;
  const slideWidth = slides[0].offsetWidth + 20; // Include margin

  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  nextBtn.addEventListener("click", function () {
    if (index < slides.length - slidesToShow) {
      index++;
    } else {
      index = 0;
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", function () {
    if (index > 0) {
      index--;
    } else {
      index = slides.length - slidesToShow;
    }
    updateSlider();
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    if (index < slides.length - slidesToShow) {
      index++;
    } else {
      index = 0;
    }
    updateSlider();
  }, 5000);
});

/// HEader
// document.addEventListener("DOMContentLoaded", function () {
//   const hamburger = document.querySelector(".hamburger");
//   const mobileMenu = document.querySelector(".mobile-menu");
//   const searchToggle = document.getElementById("search-toggle");
//   const searchBox = document.getElementById("search-box");
//   const navbar = document.querySelector(".navbar");

//   // Toggle Mobile Menu
//   hamburger.addEventListener("click", function () {
//     mobileMenu.classList.toggle("show");
//   });

//   // Expand Search Bar
//   searchToggle.addEventListener("click", function () {
//     searchBox.classList.toggle("active");
//     if (searchBox.classList.contains("active")) {
//       searchBox.style.width = "180px";
//       navbar.style.justifyContent = "flex-end"; // Hide navigation on search
//     } else {
//       searchBox.style.width = "0";
//       navbar.style.justifyContent = "space-between"; // Restore layout
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const searchToggle = document.getElementById("search-toggle");
  const searchBox = document.getElementById("search-box");
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu");
  const logo = document.querySelector(".logo");

  // Toggle Mobile Menu
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
  });

  // Expand and Collapse Search Bar
  searchToggle.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents instant closing
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
      searchBox.style.display = "block";
      searchBox.style.width = `calc(100% - ${logo.offsetWidth + 40}px)`; // Adjusts dynamically
      searchBox.style.opacity = "1";
      menu.style.display = "none"; // Hide navigation
    } else {
      searchBox.style.width = "0";
      searchBox.style.opacity = "0";
      setTimeout(() => {
        searchBox.style.display = "none";
      }, 300);
      menu.style.display = "flex"; // Restore navigation
    }
  });

  // Click outside to collapse search bar
  document.addEventListener("click", function (event) {
    if (
      !searchBox.contains(event.target) &&
      !searchToggle.contains(event.target)
    ) {
      searchBox.classList.remove("active");
      searchBox.style.width = "0";
      searchBox.style.opacity = "0";
      setTimeout(() => {
        searchBox.style.display = "none";
      }, 300);
      menu.style.display = "flex"; // Restore navigation
    }
  });
});

//FAQ
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", function () {
    const faqItem = this.parentNode;

    // Close any open FAQ
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
      }
    });

    // Toggle the selected FAQ
    faqItem.classList.toggle("active");
  });
});
