import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#f1f1ff",
		},
		secondary: {
			main: "#f12151",
		},
		info: {
			main: "#2196f3",
		},
		background: {
			default: "#E6E6FA",
		},
		text: {
			primary: "#333333",
			secondary: "#222222",
			disabled: "rgba(255,255,255,0.81)",
		},
		error: {
			main: "#e53935",
		},
		success: {
			main: "#00ff00",
		},
	},
});

export default theme;