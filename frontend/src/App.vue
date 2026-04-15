<template>
  <div class="landing-container">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    
    <main class="content-wrapper">
      <header class="hero">
        <h1 class="title">
          <span class="gradient-text">Django</span> + <span class="gradient-text-vue">Vue</span>
        </h1>
        <p class="subtitle">A full-stack containerized powerhouse</p>
        <p class="description">
          Seamlessly orchestrated with Docker Compose, connected with MySQL, and built for speed.
        </p>
      </header>

      <section class="features">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <div class="icon">{{ feature.icon }}</div>
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.desc }}</p>
        </div>
      </section>

      <div class="cta-container">
        <button class="primary-btn">Get Started</button>
        <button class="secondary-btn">View Documentation</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  {
    icon: '🐍',
    title: 'Django Backend',
    desc: 'Robust ORM, scalable architecture, and built-in administrative interface.'
  },
  {
    icon: '⚡',
    title: 'Vue 3 & Vite',
    desc: 'Lightning-fast HMR, compositional API, and a beautiful UI starting point.'
  },
  {
    icon: '🐬',
    title: 'MySQL Ready',
    desc: 'Configured and connected out of the box with Docker volumes.'
  }
])
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  box-sizing: border-box;
}

/* Background Glows */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.5;
  animation: float 10s ease-in-out infinite alternate;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%);
  top: -10%;
  left: -10%;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(66,211,146,0.2) 0%, rgba(0,0,0,0) 70%);
  bottom: -20%;
  right: -10%;
  animation-delay: -5s;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1000px;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  margin: 0;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-vue {
  background: linear-gradient(135deg, #42d392, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--text-main);
  margin: 1rem 0;
}

.description {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  text-align: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h2 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.feature-card p {
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

.cta-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.primary-btn {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.23);
  background: linear-gradient(135deg, #60a5fa, #818cf8);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
