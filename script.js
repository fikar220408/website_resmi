// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")
const backToTopBtn = document.getElementById("back-to-top")
const header = document.getElementById("header")
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
const filterBtns = document.querySelectorAll(".filter-btn")
const galleryGrid = document.getElementById("gallery-grid")
const loadingOverlay = document.getElementById("loading-overlay")
const scrollProgress = document.getElementById("scroll-progress")

// Gallery data with enhanced animations
const galleryItems = [
  {
    src: "asset/osismpk.png",
    alt: "Logo Resmi OSIS & MPK",
    caption: "Logo Resmi OSIS & MPK",
    category: "logo",
  },
  {
    src: "asset/logo-osis.png",
    alt: "Logo OSIS",
    caption: "Logo OSIS",
    category: "logo",
  },
  {
    src: "asset/logo-mpk.png",
    alt: "Logo MPK",
    caption: "Logo MPK",
    category: "logo",
  },
  {
    src: "asset/logo-smk.png",
    alt: "Logo SMK",
    caption: "Logo SMK 1 Bulukumba",
    category: "logo",
  },
  {
    src: "asset/ldkcadas.jpg",
    alt: "Kegiatan 1",
    caption: "Kegiatan Sekbid 5 - LDK calon dasar OSIS & MPK",
    category: "kegiatan",
  },
  {
    src: "asset/persami5.jpg",
    alt: "Kegiatan 2",
    caption: "Kegiatan Sekbid 2 - camping persami OSIS & MPK",
    category: "kegiatan",
  },
  {
    src: "asset/mpls.jpg",
    alt: "Kegiatan 3",
    caption: "MPLS 2025",
    category: "kegiatan",
  },
  {
    src: "asset/gerak jalan.jpg",
    alt: "Kegiatan 4",
    caption: "Gerak jalan OSIS & MPK",
    category: "kegiatan",
  },
  {
    src: "asset/bukber.jpg",
    alt: "Kegiatan 5",
    caption: "Kegiatan Sekbid 1 - Buka Bersama",
    category: "kegiatan",
  },
  {
    src: "asset/pertemuan.jpg",
    alt: "Kegiatan 6",
    caption: "pertemuan pertama anggota baru OSIS & MPK",
    category: "kegiatan",
  },
  {
    src: "asset/penti1.jpg",
    alt: "Kegiatan 7",
    caption: "KEPENGURUSAN INTI OSIS & MPK 2024-2025",
    category: "fotbar",
  },
  {
    src: "asset/outbond.jpg",
    alt: "Kegiatan 8",
    caption: "Kegiatan outbound dalam rangkainan Ldk ",
    category: "kegiatan",
  },
  {
    src: "asset/ompek3.jpg",
    alt: "Pengurus OSIS & MPK",
    caption: "Pengurus OSIS & MPK",
    category: "fotbar",
  },
  {
    src: "asset/ompek2.jpg",
    alt: "Pengurus OSIS & MPK",
    caption: "pengurus OSIS & MPK",
    category: "fotbar",
  },
  {
    src: "asset/ompek1.jpg",
    alt: "pengurus OSIS & MPK",
    caption: "Pengurus OSIS & MPK",
    category: "fotbar",
  },
  {
    src: "asset/ompek.jpg",
    alt: "pengurus OSIS & MPK",
    caption: "pengurus OSIS & MPK",
    category: "fotbar",
  },
]

// Smooth Scroll Function
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    const headerHeight = header.offsetHeight
    const targetPosition = targetSection.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })

    // Update active nav link
    updateActiveNavLink("#" + sectionId)

    // Trigger section animations
    setTimeout(() => {
      triggerSectionAnimations(targetSection)
    }, 500)
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()

    const icon = mobileMenuBtn.querySelector("i")
    const isOpen = mobileMenu.classList.contains("open")

    if (isOpen) {
      // Close menu
      mobileMenu.classList.remove("open")
      mobileMenuBtn.classList.remove("active")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")

      // Remove scroll lock
      document.body.style.overflow = ""

      // Update ARIA attributes
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      mobileMenu.setAttribute("aria-hidden", "true")
    } else {
      // Open menu
      mobileMenu.classList.add("open")
      mobileMenuBtn.classList.add("active")
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")

      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden"

      // Update ARIA attributes
      mobileMenuBtn.setAttribute("aria-expanded", "true")
      mobileMenu.setAttribute("aria-hidden", "false")
    }
  })

  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("open") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove("open")
      mobileMenuBtn.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
      document.body.style.overflow = ""

      mobileMenuBtn.setAttribute("aria-expanded", "false")
      mobileMenu.setAttribute("aria-hidden", "true")
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open")
      mobileMenuBtn.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
      document.body.style.overflow = ""

      mobileMenuBtn.setAttribute("aria-expanded", "false")
      mobileMenu.setAttribute("aria-hidden", "true")
      mobileMenuBtn.focus()
    }
  })
}

const mobileMenuItems = document.querySelectorAll(".mobile-menu-item")
mobileMenuItems.forEach((item) => {
  // Enhanced touch feedback
  item.addEventListener("touchstart", () => {
    item.style.transform = "translateX(0) scale(0.98)"
    item.style.background = "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(234, 179, 8, 0.1))"
  })

  item.addEventListener("touchend", () => {
    setTimeout(() => {
      item.style.transform = "translateX(0) scale(1)"
      item.style.background = ""
    }, 150)
  })

  // Close mobile menu when item is clicked
  item.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      setTimeout(() => {
        mobileMenu.classList.remove("open")
        mobileMenuBtn.classList.remove("active")
        const icon = mobileMenuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
        document.body.style.overflow = ""

        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
      }, 100)
    }
  })
})

// Enhanced Smooth Scrolling with Animations
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = header.offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      // Add scroll animation
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu with animation
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open")
        const icon = mobileMenuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
        mobileMenuBtn.classList.remove("bg-gradient-to-r", "from-red-500", "to-yellow-500", "text-white")
      }

      // Update active nav link with animation
      updateActiveNavLink(targetId)

      // Trigger section animations
      setTimeout(() => {
        triggerSectionAnimations(targetSection)
      }, 500)
    }
  })
})

// Enhanced Active Navigation Link Update
function updateActiveNavLink(activeId) {
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href")
    link.style.transition = "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    if (linkHref === activeId) {
      link.classList.add("bg-gradient-to-r", "from-red-500", "to-yellow-500", "text-white", "font-medium", "shadow-lg")
      link.classList.remove("text-gray-600")
      link.style.transform = "scale(1.05)"
    } else {
      link.classList.remove(
        "bg-gradient-to-r",
        "from-red-500",
        "to-yellow-500",
        "text-white",
        "font-medium",
        "shadow-lg",
      )
      link.classList.add("text-gray-600")
      link.style.transform = "scale(1)"
    }
  })
}

// Enhanced Scroll Event Handlers with Advanced Animations
let lastScrollTop = 0
let ticking = false

function updateScrollAnimations() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Enhanced header scroll effect for mobile
  if (scrollTop > 10) {
    header.classList.add("scrolled")
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.backdropFilter = "blur(20px)"
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    header.style.borderBottom = "1px solid rgba(239, 68, 68, 0.1)"
  } else {
    header.classList.remove("scrolled")
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(20px)"
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
    header.style.borderBottom = "1px solid rgba(239, 68, 68, 0.05)"
  }

  if (Math.abs(scrollTop - lastScrollTop) > 50 && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open")
    mobileMenuBtn.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
    document.body.style.overflow = ""

    mobileMenuBtn.setAttribute("aria-expanded", "false")
    mobileMenu.setAttribute("aria-hidden", "true")
  }

  // Back to top button with enhanced animation
  if (backToTopBtn) {
    if (scrollTop > 300) {
      backToTopBtn.style.opacity = "1"
      backToTopBtn.style.transform = "translateY(0) scale(1)"
      backToTopBtn.style.visibility = "visible"
    } else {
      backToTopBtn.style.opacity = "0"
      backToTopBtn.style.transform = "translateY(20px) scale(0.8)"
      backToTopBtn.style.visibility = "hidden"
    }
  }

  // Scroll progress bar
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    scrollProgress.style.width = scrollPercent + "%"
  }

  // Parallax effects for background elements
  const parallaxElements = document.querySelectorAll(".morphing-bg")
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrollTop * speed)
    element.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`
  })

  // Update active section
  updateActiveSection()

  lastScrollTop = scrollTop
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollAnimations)
    ticking = true
  }
})

// Enhanced Active Section Detection
function updateActiveSection() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + header.offsetHeight + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = "#" + section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      updateActiveNavLink(sectionId)
    }
  })
}

// Enhanced Back to Top with Animation
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    // Add click animation
    backToTopBtn.style.transform = "translateY(0) scale(0.9)"
    setTimeout(() => {
      backToTopBtn.style.transform = "translateY(0) scale(1)"
    }, 150)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Advanced Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: [0.1, 0.3, 0.5],
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target

      // Add main animation class
      element.classList.add("animate-in")

      // Trigger staggered animations for child elements
      const staggerElements = element.querySelectorAll(".stagger-animation")
      staggerElements.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("animate-in")
        }, index * 100)
      })

      // Special animations for specific elements
      if (element.classList.contains("modern-card")) {
        setTimeout(() => {
          element.style.transform = "translateY(0) rotateX(0) rotateY(0)"
          element.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
        }, 200)
      }

      // Text reveal animations
      const textElements = element.querySelectorAll(".text-reveal")
      textElements.forEach((textEl, index) => {
        setTimeout(() => {
          textEl.style.clipPath = "inset(0 0% 0 0)"
          textEl.style.opacity = "1"
        }, index * 200)
      })
    }
  })
}, observerOptions)

// Enhanced Gallery Filter with Advanced Animations
if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")

      // Update active filter button with animation
      filterBtns.forEach((b) => {
        b.style.transition = "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        b.classList.remove("active", "bg-gradient-to-r", "from-red-500", "to-yellow-500", "text-white")
        b.classList.add("text-gray-600")
        b.style.transform = "scale(1)"
      })

      btn.classList.add("active", "bg-gradient-to-r", "from-red-500", "to-yellow-500", "text-white")
      btn.classList.remove("text-gray-600")
      btn.style.transform = "scale(1.05)"

      // Animate gallery items out, then in
      const currentItems = galleryGrid.querySelectorAll(".gallery-item")
      currentItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "0"
          item.style.transform = "translateY(30px) scale(0.9)"
        }, index * 50)
      })

      // Render new gallery after animation
      setTimeout(
        () => {
          renderGallery(filter)
        },
        currentItems.length * 50 + 200,
      )
    })
  })
}

// Enhanced Gallery Rendering with Advanced Animations
function renderGallery(filter) {
  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  // Clear gallery with fade out animation
  if (galleryGrid) {
    galleryGrid.style.opacity = "0"
    galleryGrid.style.transform = "scale(0.95)"

    setTimeout(() => {
      galleryGrid.innerHTML = ""

      // Add filtered items with staggered animations
      filteredItems.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index)
        galleryGrid.appendChild(galleryItem)
      })

      // Fade in gallery
      galleryGrid.style.opacity = "1"
      galleryGrid.style.transform = "scale(1)"

      // Animate items in
      const newItems = galleryGrid.querySelectorAll(".gallery-item")
      newItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0) scale(1)"
          observer.observe(item)
        }, index * 100)
      })
    }, 300)
  }
}

// Enhanced Gallery Item Creation with Modern Effects
function createGalleryItem(item, index) {
  const div = document.createElement("div")
  div.className = `gallery-item modern-card overflow-hidden rounded-2xl shadow-xl opacity-0 transform translate-y-8 scale-90 transition-all duration-500`
  div.style.transitionDelay = `${index * 100}ms`

  div.innerHTML = `
        <div class="relative group">
            <img src="${item.src}" alt="${item.alt}" class="w-full h-64 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
               <a href="${item.src}" target="_blank"> <div class="text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <i class="fas fa-expand-alt text-3xl animate-pulse"></i>
                    <p class="mt-2 text-sm font-medium">Lihat Detail</p>
                </div>
            </div>
           
            <div class="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 class="text-white font-bold text-sm">${item.caption}</h3>
            </div></a>
        </div>
    `

  // Enhanced click interaction
  div.addEventListener("click", () => {
    // Add click animation
    div.style.transform = "scale(0.95)"
    setTimeout(() => {
      div.style.transform = "scale(1)"
    }, 150)

    // You can add modal or lightbox functionality here
    console.log("Gallery item clicked:", item.caption)
  })

  return div
}

// Advanced Mouse Parallax Effect
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector("#home")
  if (!hero) return

  const rect = hero.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const deltaX = (x - centerX) / centerX
  const deltaY = (y - centerY) / centerY

  // Enhanced parallax for different elements
  const floatingElements = hero.querySelectorAll(".animate-float, .animate-float-delayed")
  floatingElements.forEach((element, index) => {
    const intensity = (index + 1) * 15
    const rotation = deltaX * 5
    element.style.transform = `translateX(${deltaX * intensity}px) translateY(${deltaY * intensity}px) rotate(${rotation}deg)`
  })

  // Parallax for morphing backgrounds
  const morphingBgs = hero.querySelectorAll(".morphing-bg")
  morphingBgs.forEach((bg, index) => {
    const intensity = (index + 1) * 8
    bg.style.transform = `translateX(${deltaX * intensity}px) translateY(${deltaY * intensity}px)`
  })
})

// Enhanced Button Interactions with Advanced Effects
document.querySelectorAll(".btn-modern").forEach((btn) => {
  // Enhanced hover effects
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-3px) scale(1.05)"
    btn.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)"
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0) scale(1)"
    btn.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
  })

  // Enhanced click effects
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "translateY(-1px) scale(1.02)"
  })

  btn.addEventListener("mouseup", () => {
    btn.style.transform = "translateY(-3px) scale(1.05)"
  })
})

// Advanced Ripple Effect
function createAdvancedRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  // Enhanced ripple styling
  circle.style.position = "absolute"
  circle.style.borderRadius = "50%"
  circle.style.background = "rgba(255, 255, 255, 0.6)"
  circle.style.transform = "scale(0)"
  circle.style.animation = "ripple-animation 0.6s linear"
  circle.style.pointerEvents = "none"

  const ripple = button.getElementsByClassName("ripple")[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)

  // Remove ripple after animation
  setTimeout(() => {
    circle.remove()
  }, 600)
}

// Apply advanced ripple to all buttons
document.querySelectorAll(".btn-modern").forEach((btn) => {
  btn.style.position = "relative"
  btn.style.overflow = "hidden"
  btn.addEventListener("click", createAdvancedRipple)
})

// Enhanced Loading Screen with Animations
function hideLoadingScreen() {
  setTimeout(() => {
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0"
      loadingOverlay.style.transform = "scale(1.1)"

      setTimeout(() => {
        loadingOverlay.style.display = "none"
        document.body.classList.add("loaded")

        // Trigger initial animations
        triggerInitialAnimations()
      }, 500)
    }
  }, 1500)
}

// Trigger Initial Page Animations
function triggerInitialAnimations() {
  // Animate header
  const headerElements = header.querySelectorAll(".stagger-animation")
  headerElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("animate-in")
    }, index * 200)
  })

  // Animate hero section
  const heroElements = document.querySelectorAll("#home .scroll-reveal")
  heroElements.forEach((el, index) => {
    setTimeout(
      () => {
        el.classList.add("revealed")
        el.style.opacity = "1"
        el.style.transform = "translateY(0) scale(1)"
      },
      500 + index * 300,
    )
  })

  // Start typing animation for hero text
  const heroText = document.getElementById("hero-text")
  if (heroText) {
    const text = heroText.textContent
    heroText.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 2000)
  }
}

// Trigger Section Animations
function triggerSectionAnimations(section) {
  const animateElements = section.querySelectorAll(".scroll-reveal, .animate-on-scroll, .stagger-animation")
  animateElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("animate-in", "revealed")
      el.style.opacity = "1"
      el.style.transform = "translateY(0) scale(1)"
    }, index * 100)
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial ARIA attributes
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute("aria-expanded", "false")
    mobileMenuBtn.setAttribute("aria-controls", "mobile-menu")
    mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu")
  }

  if (mobileMenu) {
    mobileMenu.setAttribute("aria-hidden", "true")
    mobileMenu.setAttribute("role", "navigation")
    mobileMenu.setAttribute("aria-label", "Mobile navigation menu")
  }

  // Observe all scroll reveal elements
  const scrollElements = document.querySelectorAll(".scroll-reveal, .animate-on-scroll, .stagger-animation")
  scrollElements.forEach((el) => observer.observe(el))

  // Initialize gallery
  renderGallery("all")

  // Hide loading screen
  hideLoadingScreen()

  // Add dynamic styles for enhanced animations
  addDynamicStyles()
})

// Add Dynamic Styles for Enhanced Animations
function addDynamicStyles() {
  const style = document.createElement("style")
  style.textContent = `
        .scroll-reveal {
            transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-reveal.revealed {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }
        
        .gallery-item {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .gallery-item:hover {
            transform: translateY(-10px) rotateX(5deg) rotateY(5deg) !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
        }
        
        .modern-card {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .text-reveal {
            clip-path: inset(0 100% 0 0);
            transition: clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
        
        .parallax-element {
            transition: transform 0.1s ease-out;
        }
        
        .scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
            border-bottom: 1px solid rgba(239, 68, 68, 0.1) !important;
        }
    `
  document.head.appendChild(style)
}



// Performance optimization
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    // Recalculate positions and animations on resize
    updateActiveSection()
  }, 250)
})

// Console welcome message
console.log(`
🎉 Website OSIS & MPK SMK 1 Bulukumba loaded successfully!
✨ Enhanced with modern animations and transitions
🚀 Optimized for performance and accessibility
📱 Fully responsive design
`)
