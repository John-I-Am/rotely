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
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import type { UserCredentials } from "../../types";
import classes from "./SignUpForm.module.css";

export const SignUpForm = () => {
	const navigate = useNavigate();
	const [pending, setPending] = useState<boolean>(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
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

			confirmPassword: (value, values) =>
				value !== values.password ? "Passwords did not match" : null,
		},
	});

	const handleSignUp = async ({ email, password }: UserCredentials) => {
		await authClient.signUp.email(
			{
				email,
				password: password,
				name: email,
				// callbackURL: "/",    callback not redirecting for some reason, use manual useNavigate hook
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					navigate({ to: "/app/dashboard" });
				},
				onError: (ctx) => {
					form.setFieldError("email", ctx.error.message);
					setPending(false);
				},
			},
		);
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Create an account
			</Title>

			<Text className={classes.subtitle}>
				Already have an account?{" "}
				<Anchor component={Link} to="/login" from="/signup">
					Login
				</Anchor>
			</Text>

			<Paper withBorder p={22} shadow="sm" mt={30}>
				<form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
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

					<PasswordInput
						withAsterisk
						label="Confirm password"
						placeholder="Your password"
						key={form.key("confirmPassword")}
						{...form.getInputProps("confirmPassword")}
						mt="lg"
					/>

					<Group justify="space-between" mt="lg">
						<Checkbox label="Remember me" />
					</Group>
					<Button type="submit" fullWidth mt="xl" loading={pending}>
						Sign Up
					</Button>
				</form>
			</Paper>
		</Container>
	);
};
