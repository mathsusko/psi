// tailwind.config.js
export default {
  theme: {
    extend: {}
  },
  plugins: [],
  // 👇 Adicione isso para compatibilidade com html2canvas
  experimental: {
    optimizeUniversalDefaults: true // (opcional)
  },
  // 👇 Isso remove o uso de `oklch()` nas cores
  corePlugins: {
    preflight: false // se estiver usando shadcn-ui, já pode estar assim
  }
}
