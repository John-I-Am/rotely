import { Group, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { IconTornado } from "@tabler/icons-react";
import { IconWrapper } from "../IconWrapper/IconWrapper";

export const Logo = () => {
	const theme = useMantineTheme();

	return (
		<Group>
			<ThemeIcon
				size="xl"
				variant="gradient"
				gradient={{
					from: theme.primaryColor,
					to: theme.other.secondaryColor,
					deg: 120,
				}}
			>
				<IconWrapper icon={IconTornado} />
			</ThemeIcon>
			<Text
				size="xl"
				fw={600}
				variant="gradient"
				gradient={{
					from: theme.other.secondaryColor,
					to: theme.primaryColor,
					deg: 90,
				}}
			>
				Rotely
			</Text>
		</Group>
	);
};
