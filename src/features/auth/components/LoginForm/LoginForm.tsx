import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/auth-client";
import type { UserCredentials } from "../../types";
import classes from "./LoginForm.module.css";

export const LoginForm = () => {
	const navigate = useNavigate();
	const [loading, { toggle }] = useDisclosure();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: (value) => {
				if (!value) return "Required";
				if (!/^\S+@\S+$/.test(value)) return "Invalid email";
				return null;
			},

			password: (value) =>
				isNotEmpty("Required")(value) ||
				hasLength({ min: 8 }, "Must be at least 8 characters")(value),
		},
	});

	const handleLogin = async ({ email, password }: UserCredentials) => {
		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
				// callbackURL: "/",    callback not redirecting for some reason, use manual useNavigate hook
			},
			{
				onRequest: () => {
					toggle();
				},
				onSuccess: () => {
					navigate({ to: "/app/dashboard" });
				},
				onError: (ctx) => {
					console.log(data);
					console.log(ctx.error.message);
					console.log(error);
				},
			},
		);
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>

			<Text className={classes.subtitle}>
				Do not have an account yet?{" "}
				<Anchor component={Link} to="/signup" from="/login">
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
				<form onSubmit={form.onSubmit((values) => handleLogin(values))}>
					<TextInput
						withAsterisk
						label="Email"
						placeholder="you@example.com"
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						withAsterisk
						label="Password"
						placeholder="Your password"
						key={form.key("password")}
						{...form.getInputProps("password")}
						mt="lg"
					/>
					<Group justify="space-between" mt="lg">
						<Checkbox label="Remember me" />
					</Group>
					<Button type="submit" fullWidth mt="xl" loading={loading}>
						Sign In
					</Button>
				</form>
			</Paper>
		</Container>
	);
};
