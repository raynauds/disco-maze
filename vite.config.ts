import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import rune from "vite-plugin-rune"

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), rune({ logicPath: path.resolve("./src/rune/logic.ts") })],
})
