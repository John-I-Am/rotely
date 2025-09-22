import { Group } from "@mantine/core";

import { Logo } from "@/components/Logo/Logo";
import { ThemeSwitch } from "@/components/ThemeSwitch/ThemeSwitch";

export const Header = () => {
	return (
		<header>
			<Group p="md" justify="space-between">
				<Logo />
				<ThemeSwitch />
			</Group>
		</header>
	);
};
