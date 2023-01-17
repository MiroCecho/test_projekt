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
    port: 2023
  },
  exports:{}
};