import {
	ActionIcon,
	Button,
	colorsTuple,
	createTheme,
	Group,
	Image,
	Loader,
	Paper,
	rem,
	ScrollArea,
	Skeleton,
	Textarea,
	TextInput,
	ThemeIcon,
	Tooltip,
} from "@mantine/core";

export const theme = createTheme({
	other: {
		secondaryColor: "pink",
	},
	colors: {
		"dark-navy": colorsTuple("#2c3143"),
	},

	black: "#2c3143",
	primaryColor: "indigo",
	primaryShade: { light: 5, dark: 9 },

	fontFamily: "notoSans, sans-serif",
	headings: {
		fontFamily: "notoSans, sans-serif",
		fontWeight: "500",
		sizes: {
			h1: { fontSize: rem(22) },
			h2: { fontSize: rem(20) },
			h3: { fontSize: rem(18) },
		},
	},

	components: {
		Group: Group.extend({
			defaultProps: {
				wrap: "nowrap",
			},
		}),
		Button: Button.extend({
			defaultProps: {
				color: "dark-navy",
				radius: "md",
				loaderProps: { type: "dots" },
			},
		}),
		ActionIcon: ActionIcon.extend({
			defaultProps: {
				radius: "md",
				loaderProps: { type: "dots" },
			},
		}),
		ThemeIcon: ThemeIcon.extend({
			defaultProps: {
				radius: "md",
			},
		}),
		Paper: Paper.extend({
			defaultProps: {
				radius: "md",
				p: "md",
			},
		}),
		Tooltip: Tooltip.extend({
			defaultProps: {
				openDelay: 1000,
			},
		}),
		TextInput: TextInput.extend({
			defaultProps: {
				radius: "md",
			},
			styles: { error: { position: "absolute" } },
		}),
		Textarea: Textarea.extend({
			defaultProps: {
				radius: "md",
			},
			styles: { error: { position: "absolute" } },
		}),
		Skeleton: Skeleton.extend({
			defaultProps: {
				radius: "md",
			},
		}),
		ScrollArea: ScrollArea.extend({
			defaultProps: {
				offsetScrollbars: true,
				type: "always",
				h: "100%",
			},
		}),
		Image: Image.extend({
			defaultProps: {
				radius: "md",
			},
		}),
		Loader: Loader.extend({
			defaultProps: {
				type: "dots",
			},
		}),
	},
});
