// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    // Pin the tsconfig. Without this, rolldown also picks up tsconfigs in
    // parent folders, which breaks git worktrees nested inside the repo.
    tsconfig: './tsconfig.json',
  },
});
