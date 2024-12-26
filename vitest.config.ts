import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Allows vitest to have access to browser-level objects such as window
  },
})