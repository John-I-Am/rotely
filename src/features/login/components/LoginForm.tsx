import { Button } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
	const navigate = useNavigate();

	const handleLogin = async () => {
		const { data, error } = await authClient.signUp.email(
			{
				email: "rootrrrr4frfffrrrt43b@root.com",
				password: "12345678",
				name: "user name",
				// callbackURL: "/",    callback not redirecting for some reason, use manual useNavigate hook
			},
			{
				onRequest: (ctx) => {
					//show loading
				},
				onSuccess: (ctx) => {
					//redirect to the dashboard or sign in page
					navigate({ to: "/app/dashboard" });
				},
				onError: (ctx) => {
					// display the error message
					console.log(data);
					console.log(ctx.error.message);
					console.log(error);
				},
			},
		);
	};

	return <Button onClick={handleLogin}>Sign up</Button>;
};
