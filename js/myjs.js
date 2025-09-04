const header = document.querySelector('header');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const roles = document.querySelectorAll('.neon-text .role');
const myBtn = document.querySelectorAll('.my-btn');
const mySBtn = document.querySelectorAll('.my-skill-btn');

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

    item.addEventListener("mouseenter", () => {
      fill.style.width = percent + "%";
      percentText.textContent = percent + "% familiarity";
      percentText.style.color = "var(--white-color)"
    });

    item.addEventListener("mouseleave", () => {
      fill.style.width = "0";
      percentText.textContent = "";
    });
});