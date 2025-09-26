import {
	ActionIcon,
	Box,
	Group,
	NavLink,
	Paper,
	ScrollArea,
	Stack,
	Tooltip,
} from "@mantine/core";

import {
	IconChalkboard,
	IconDoorExit,
	IconHome,
	IconLibrary,
	IconPin,
	IconPinnedFilled,
	IconSettings,
} from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import cx from "clsx";
import { type JSX, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Route as CollectionsRoute } from "@/routes/app/collections";
import { Route as DashboardRoute } from "@/routes/app/dashboard";
import { Route as SettingsRoute } from "@/routes/app/settings";
import { Route as StudyRoute } from "@/routes/app/study";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { Logo } from "../Logo/Logo";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import classes from "./Navbar.module.css";

type NavItem = {
	label: string;
	icon?: JSX.Element;
	link: string;
	links?: NavItem[];
};

const navItems: NavItem[] = [
	{
		label: "Study",
		icon: <IconWrapper icon={IconChalkboard} />,
		link: StudyRoute.to,
	},
	{
		label: "Dashboard",
		icon: <IconWrapper icon={IconHome} />,
		link: DashboardRoute.to,
	},
	{
		label: "Collections",
		icon: <IconWrapper icon={IconLibrary} />,
		link: CollectionsRoute.to,
	},
	{
		label: "Settings",
		icon: <IconWrapper icon={IconSettings} />,
		link: SettingsRoute.to,
	},
];

type NavbarProps = {
	isDrawer: boolean;
};

export const Navbar = ({ isDrawer }: NavbarProps) => {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState<boolean>(true);

	const links = navItems.map((item: NavItem) => (
		<NavLink
			classNames={{
				root: classes.link,
				label: classes["link-label"],
			}}
			component={Link}
			to={item.link}
			key={item.label}
			href={item.link}
			label={item.label}
			leftSection={item.icon}
			variant="filled"
		></NavLink>
	));

	return (
		<Paper
			visibleFrom={isDrawer ? undefined : "xs"}
			component="nav"
			className={cx(classes.navbar, {
				[classes["navbar-collapsed"]]: expanded === false,
			})}
		>
			<Group justify="space-between">
				<Logo />

				<Group align="baseline">
					<Tooltip label={expanded ? "Unpin view" : "Pin view"}>
						<ActionIcon
							display={isDrawer ? "none" : ""}
							variant={expanded ? "filled" : "outline"}
							aria-label={expanded ? "pin-nav" : "unpin-nav"}
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? <IconPinnedFilled /> : <IconPin />}
						</ActionIcon>
					</Tooltip>
					<Tooltip label="Toggle Theme">
						<Box>
							<ThemeSwitch />
						</Box>
					</Tooltip>
				</Group>
			</Group>

			<ScrollArea type="never">
				<div className={classes.links}>{links}</div>
			</ScrollArea>

			<Stack className={classes.footer}>
				<NavLink
					classNames={{
						root: classes.link,
						body: expanded === false ? classes["link-compact"] : undefined,
					}}
					component="button"
					label="Logout"
					leftSection={<IconDoorExit />}
					variant="filled"
					onClick={async () => {
						await authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									navigate({ to: "/login" });
									// TODO: clear all app data on signout
								},
							},
						});
					}}
				/>
			</Stack>
		</Paper>
	);
};
