let currentGameSlide = 0;
let currentIndex = 0;


window.addEventListener("scroll", function () {
    const button = document.getElementById("button-to-top");
    const header = document.querySelector("header");

    if (header.getBoundingClientRect().top < 0) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
});

function openNavigationPanel() {
    var navigationPanel = document.querySelector('.navigation-panel');
    var body = document.querySelector('body');

    body.style.overflow = 'hidden';
    navigationPanel.style.display = 'flex';
}

function closeNavigationPanel() {
    var navigationPanel = document.querySelector('.navigation-panel');
    var body = document.querySelector('body');
    body.style.overflow = '';
    navigationPanel.style.display = 'none';
}

function prevGameSlide() {
    var slider = document.querySelector(".slider");
    var dots = document.querySelectorAll(".dot");

    var currentGameSlide = document.querySelector(".slide.active");
    var prevSlide = currentGameSlide.previousElementSibling || slider.lastElementChild;

    slider.classList.add("animating");
    currentGameSlide.classList.remove("active");
    prevSlide.classList.add("active");

    var currentDot = document.querySelector(".dot.active");
    var prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

    currentDot.classList.remove("active");
    prevDot.classList.add("active");

    setTimeout(function () {
        slider.classList.remove("animating");
    }, 500);

    var sliderRect = slider.getBoundingClientRect();
    slider.style.transform = "translateX(-" + (prevSlide.getBoundingClientRect().left - sliderRect.left) + "px)";
}

function nextGameSlide() {
    var slider = document.querySelector(".slider");
    var dots = document.querySelectorAll(".dot");

    var currentGameSlide = document.querySelector(".slide.active");
    var nextSlide = currentGameSlide.nextElementSibling || slider.firstElementChild;

    slider.classList.add("animating");
    currentGameSlide.classList.remove("active");
    nextSlide.classList.add("active");

    var currentDot = document.querySelector(".dot.active");
    var nextDot = currentDot.nextElementSibling || dots[0];

    currentDot.classList.remove("active");
    nextDot.classList.add("active");

    setTimeout(function () {
        slider.classList.remove("animating");
    }, 500);

    var sliderRect = slider.getBoundingClientRect();
    slider.style.transform = "translateX(-" + (nextSlide.getBoundingClientRect().left - sliderRect.left) + "px)";
}

function goToGameSlide(index) {
    var slider = document.querySelector(".slider");
    var dots = document.querySelectorAll(".dot");
    var slides = document.querySelectorAll(".slide");

    var currentSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains("active"));

    if (index !== currentSlideIndex) {
        slider.classList.add("animating");
        slides[currentSlideIndex].classList.remove("active");
        slides[index].classList.add("active");

        dots[currentSlideIndex].classList.remove("active");
        dots[index].classList.add("active");

        setTimeout(function () {
            slider.classList.remove("animating");
        }, 500);

        var sliderRect = slider.getBoundingClientRect();
        slider.style.transform = "translateX(-" + (slides[index].getBoundingClientRect().left - sliderRect.left) + "px)";
    }
}

function prevTeamSlide() {
    const memberSlider = document.querySelector('.members');
    const members = Array.from(document.querySelectorAll('.member'));
    const memberWidth = members[0].getBoundingClientRect().width;

    if (currentIndex > 0) {
        currentIndex--;
        memberSlider.style.transform = `translateX(-${memberWidth * currentIndex}px)`;
    } else {
        currentIndex = members.length - 3;
        memberSlider.style.transform = `translateX(-${memberWidth * currentIndex}px)`;
    }
}

function nextTeamSlide() {
    const memberSlider = document.querySelector('.members');
    const members = Array.from(document.querySelectorAll('.member'));
    const memberWidth = members[0].getBoundingClientRect().width;

    if (currentIndex < members.length - 3) {
        currentIndex++;
        memberSlider.style.transform = `translateX(-${memberWidth * currentIndex}px)`;
    } else {
        currentIndex = 0;
        memberSlider.style.transform = `translateX(-${memberWidth * currentIndex}px)`;
    }
}

function scrollToHeader() {
    document.querySelector("header").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function scrollToAbout() {
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function scrollToGames() {
    document.querySelector("#best-games").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function scrollToAllGames() {
    document.querySelector("#all-games").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function scrollToTeamMember() {
    document.querySelector("#team-member").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function scrollToContacts() {
    document.querySelector("#gmail-contact").scrollIntoView({
        behavior: "smooth",
        duration: 1000,
    });
}

function openAppStore() {
    window.open("https://www.apple.com/ua/", "_blank");
}

function openGooglePlay() {
    window.open("https://play.google.com/store/games", "_blank");
}

function openYouTube() {
    window.open("https://www.youtube.com/@quake0ut", "_blank");
}

function openTwitter() {
    window.open("https://twitter.com", "_blank");
}

function openFacebook() {
    window.open("https://facebook.com", "_blank");
}

function openGitHub() {
    window.open("https://github.com/FMaksym", "_blank");
}

function openLinkedIn() {
    window.open("https://www.linkedin.com/in/maksym-filipyev-28a924280/", "_blank");
}

function openNotion() {
    window.open("https://quakeout-053.notion.site/quakeout-053/QuakeOut-Certain-View-9e019ee8784f4adc95bc66ba3e318ccc", "_blank");
}

function openGmail() {
    window.open("mailto:quakeout553@gmail.com");
}