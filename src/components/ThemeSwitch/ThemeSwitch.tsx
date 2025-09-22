import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconBulbFilled, IconBulbOff } from "@tabler/icons-react";
import { IconWrapper } from "../IconWrapper/IconWrapper";

export const ThemeSwitch = () => {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
			<IconWrapper
				icon={colorScheme === "dark" ? IconBulbOff : IconBulbFilled}
			/>
		</ActionIcon>
	);
};
