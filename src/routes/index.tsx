import { Button, Text } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/IndexComponents/Header/Header";
import { createUser, getUsers } from "@/features/auth/api/users";
import { Route as DashboardRoute } from "./app/dashboard";

const Home = () => {
	// const users: any = Route.useLoaderData();
	// console.log(users);

	return (
		<>
			<Header />
			<Text>THIS IS MY HOME PAGE</Text>
			<Button component={Link} from="/" to={DashboardRoute.to}>
				GO TO APP
			</Button>
			<Button onClick={() => createUser()}>Create User</Button>
			{/* <ul>
				{users.map((user: any) => (
					<li>{user.email}</li>
				))}
			</ul> */}
		</>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
	// loader: () => {
	// 	return getUsers();
	// },
});
