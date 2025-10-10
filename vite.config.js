import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
	target: "19",
};

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		tsconfigPaths(),
		tailwindcss(),
		laravel({
			input: "resources/js/app.tsx",
			ssr: "resources/js/ssr.tsx",
			refresh: true,
		}),
	],
	test: {
		environment: "happy-dom",
		setupFiles: ["./resources/__tests__/setup.ts"],
		include: ["resources/**/*.{test,spec}.{ts,tsx}"],
	},
});
