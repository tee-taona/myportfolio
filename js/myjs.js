const header = document.querySelector('header');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const roles = document.querySelectorAll('.neon-text .role');
const myBtn = document.querySelectorAll('.my-btn');
const mySBtn = document.querySelectorAll('.my-skill-btn');
const toggler = document.getElementById("nav-toggler");
const navWrapper = document.querySelector("nav");
const form = this;
const icon = toggler.querySelector("i");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    const fill = entry.target.querySelector(".skill-fill");
    const percentText = entry.target.querySelector(".skill-percent");
    const percent = entry.target.getAttribute("data-percent");

    if (entry.isIntersecting) {
      fill.style.transition = "width 1s ease";
      fill.style.width = percent + "%";
      percentText.textContent = percent + "% familiarity";
      percentText.style.opacity = "1";
    } else {
      fill.style.width = "0";
      percentText.textContent = "";
      percentText.style.opacity = "0";
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });

    if (pageYOffset > 150) {
        header.classList.add("blur");
    } else {
        header.classList.remove("blur");
    }
});

let currentRole = 0;
setInterval(() => {
  roles[currentRole].classList.add('flicker-out');

  setTimeout(() => {
    roles[currentRole].classList.remove('active', 'flicker-out');
    currentRole = (currentRole + 1) % roles.length;
    roles[currentRole].classList.add('active');
  }, 3000);
}, 6000);

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-info");
  const paragraphs = aboutSection.querySelectorAll("p");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        paragraphs.forEach((p, index) => {
          p.style.animation = `
            typing 1s ease-out ${index * 3}s forwards
          `;
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
});

myBtn.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
        const myDetails = document.querySelectorAll(".my-detail");

        myBtn.forEach(b => b.classList.remove("active"));
        myDetails.forEach(detail => detail.classList.remove("active"));

        btn.classList.add("active");

        const detail = myDetails[idx];

        const rect = detail.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        detail.style.transformOrigin = `${x}px ${y}px`;

        detail.classList.add("active");
    });
});

mySBtn.forEach((sbtn,idx) =>{
    sbtn.addEventListener("click", () => {

        const myList = document.querySelectorAll(".my-list");
        mySBtn.forEach(sbtn => {
            sbtn.classList.remove("active",)
        });sbtn.classList.add("active");

        myList.forEach(list => {
            list.classList.remove("active");
        }); myList[idx].classList.add("active");
    });
});

document.querySelectorAll(".my-item").forEach(item => {
  const fill = item.querySelector(".skill-fill");
  const percentText = item.querySelector(".skill-percent");
  const percent = item.getAttribute("data-percent");

  if (window.matchMedia("(hover: hover) and (pointer: coarse)").matches) {
    item.addEventListener("mouseenter", () => {
      fill.style.transition = "width 1s ease";
      fill.style.width = percent + "%";
      percentText.textContent = percent + "% familiarity";
      percentText.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
      fill.style.width = "0";
      percentText.textContent = "";
      percentText.style.opacity = "0";
    });
  }if (window.matchMedia("(hover: none)").matches) {
    document.querySelectorAll(".my-item").forEach(item => {
      const fill = item.querySelector(".skill-fill");
      const percentText = item.querySelector(".skill-percent");

      const percent = item.getAttribute("data-percent");

      fill.style.width = percent + "%";
      fill.style.transition = "none";

      percentText.textContent = percent + "% familiarity";
      percentText.style.opacity = "1";

      item.classList.add("touch-visible");
    });
  } else {
    fill.style.width = "0";
    percentText.textContent = "";
    percentText.style.opacity = "0";
  }
});


  document.querySelectorAll(".my-item").forEach(item => observer.observe(item));
  toggler.addEventListener("click", () => {
    navWrapper.classList.toggle("active");
    icon.classList.toggle("bx-menu-alt-right");
    icon.classList.toggle("bx-arrow-back");
});

try {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    const servicesContainer = document.querySelector(".services-container");
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach(item => {
      item.addEventListener("touchstart", (e) => {
        e.stopPropagation();

        servicesContainer.style.animationPlayState = "paused";

        serviceItems.forEach(si => {
          const upright = si.querySelector(".upright");
          upright.style.animationPlayState = "paused";
        });

        const info = item.querySelector(".service-info");
        info.style.opacity = "14";
        info.style.bottom = "80px";
      });
    });

    document.addEventListener("touchstart", (e) => {
      if (!e.target.closest(".service-item")) {
        servicesContainer.style.animationPlayState = "running";
        serviceItems.forEach(si => {
          const upright = si.querySelector(".upright");
          upright.style.animationPlayState = "running";

          const info = si.querySelector(".service-info");
          info.style.opacity = "0";
          info.style.bottom = "40px";
        });
      }
    });
  }
}catch (err){
  console.error(err);
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#contactForm");
  if (!form) return;
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_xdp7p6r", "template_2y2kkpw", this,'MYd2mNY-r15RGrO5r')
    .then(function() {
      alert("✅ Message sent successfully!");
      this.reset();
    }, function(error) {
      alert("❌ Failed to send message: " + JSON.stringify(error));
    });
});
})