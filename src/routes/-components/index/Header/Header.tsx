import { Button, Group } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo/Logo";
import { ThemeSwitch } from "@/components/ThemeSwitch/ThemeSwitch";
import { Route as LoginRoute } from "@/routes/login";

export const Header = () => {
	return (
		<header>
			<Group p="md" justify="space-between">
				<Logo />

				<Group>
					<Group>
						<ThemeSwitch />
					</Group>
					<Button ml="lg" component={Link} from="/" to={LoginRoute.to}>
						Login
					</Button>
				</Group>
			</Group>
		</header>
	);
};
