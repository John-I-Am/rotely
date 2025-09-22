import { ThemeIcon } from "@mantine/core";
import { IconButterfly } from "@tabler/icons-react";
import { IconWrapper } from "../IconWrapper/IconWrapper";

export const Logo = () => {
	return (
		<ThemeIcon variant="light">
			<IconWrapper icon={IconButterfly} />
		</ThemeIcon>
	);
};
