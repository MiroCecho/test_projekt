export default {
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: () => { return "bundle" }
      }
    },
  },
  server: {
    hmr: { overlay: false },
    port: 3000
  },
  exports:{}
};