import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/features/auth/api/users";
import { SignUpForm } from "@/features/auth/components/SignUpForm/SIgnUpForm";

const Signup = () => {
	return <SignUpForm></SignUpForm>;
};

export const Route = createFileRoute("/signup")({
	beforeLoad: async ({ location }) => {
		if (await getAuthUser()) {
			throw redirect({
				to: "/app/dashboard",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Signup,
});
