# ✧ Living Digital Exhibition — Portfolio Edition

A luxury, interactive digital exhibition and cinematic photo gallery built with **React**, **Vite**, **TailwindCSS**, **GSAP**, and **Framer Motion**.

This repository is an **independent public showcase version** of an editorial storytelling web application. All personal and family photographs have been replaced with curated, high-resolution royalty-free imagery and open CC0 media, maintaining the original art direction, layout transitions, and interactive features while protecting personal privacy.

---

## ✨ Features

- **Cinematic Hero**: Letter-by-letter kinetic typography, GPU-accelerated parallax, and progressive blur-up image reveal.
- **Chapter Storytelling**: Structured narrative chapters with fluid scroll navigation powered by Lenis smooth scrolling.
- **Living Memory Carousel (Chapter II)**: Asymmetric 7-card horizontal film strip stream with auto-progression, interactive drag/swipe gestures, and zero photo duplication.
- **Moments in Motion (Chapter III)**: Synchronized video showcase with intelligent autoplay and smooth layout swapping between featured and secondary films.
- **Celebration Chapter (Chapter IV)**: Dynamic real-time countdown, canvas particle system, and micro-animations.
- **Ambient Sound Generator**: 100% client-side Web Audio API ambient soundscape with zero external audio assets required.
- **Dedicated Media Lightboxes**: Code-split, gesture-enabled fullscreen inspection for both photographs and videos.
- **Secret Memory Room (Easter Egg)**: Password-protected hidden archive accessible via a 5-click easter egg on the brand mark. *(Demo Key: demo)*

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with custom editorial typography tokens |
| **Animation** | [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger) & [Framer Motion 11](https://www.framer.com/motion/) |
| **Smooth Scroll** | [Lenis 1.1](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Asset Pipeline** | [Sharp](https://sharp.pixelplumbing.com/) for automated WebP responsive srcset generation |
| **Audio** | Native Web Audio API synth (D Major 7 warm cinematic harmonic drone) |

---

## 🚀 Quick Start

### 1. Clone the repository
`ash
git clone https://github.com/arasadaanishkarthik/family-website-public.git
cd family-website-public
`

### 2. Install dependencies
`ash
npm install
`

### 3. Start development server
`ash
npm run dev
`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
`ash
npm run build
`
This command compiles the Vite bundle and runs scripts/postbuild.js to prepare assets for GitHub Pages deployment.

---

## 🔒 Privacy & Separation Notice

This repository was created as an isolated, public demonstration project:
- **Zero Family Media**: All original photographs and personal family videos were excluded prior to initialization.
- **Independent Git Tree**: Initialized with a completely fresh commit history and separate remote origin.
- **Demo Media**: Powered by royalty-free demo photography and CC0 public domain video streams.

---

## 📄 License

MIT License. Designed and developed by Anish Karthik.
