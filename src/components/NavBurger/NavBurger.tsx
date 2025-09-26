import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import cx from "clsx";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { Navbar } from "../Navbar/Navbar";
import classes from "./NavBurger.module.css";

export const NavBurger = () => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				withCloseButton={false}
				opened={opened}
				onClose={close}
				classNames={{ body: classes.body, content: classes.content }}
				size="16rem" // needs to match Navbar width
			>
				<Navbar isDrawer={true} />
			</Drawer>
			<ActionIcon
				hiddenFrom="xs"
				className={cx(classes.burger, {
					[classes.small]: opened === false,
					[classes.big]: opened,
				})}
				variant="transparent"
				aria-label="Navigation-burger"
				onClick={open}
			>
				<IconWrapper icon={IconMenu2} size={20} />
			</ActionIcon>
		</>
	);
};
