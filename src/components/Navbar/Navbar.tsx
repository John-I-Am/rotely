import {
	ActionIcon,
	Group,
	NavLink,
	Paper,
	ScrollArea,
	Stack,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import {
	IconChalkboard,
	IconDoorExit,
	IconHome,
	IconLibrary,
	IconPin,
	IconPinnedFilled,
	IconSettings,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import cx from "clsx";
import { type JSX, useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Route as DashboardRoute } from "@/routes/app/dashboard";
import { Route as DecksRoute } from "@/routes/app/decks";
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
		label: "Decks",
		icon: <IconWrapper icon={IconLibrary} />,
		link: DecksRoute.to,
		links: [
			{
				label: "My Decks",
				link: `${DecksRoute.to}?shared=false`, // replace with search params api
			},
			{
				label: "Community Decks",
				link: `${DecksRoute.to}?shared=true`, // replace with search params api
			},
		],
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
	const [showSub, setShowSub] = useState<boolean>(false);
	const { ref, width } = useElementSize();

	// probably should use Tanstack's search params apis to set active sublinks instead of explicitly matching the entire url,
	// however i can't get it to work properly at the moment.
	// possibility BETA bug
	const location = useLocation();

	// 240 is the width of the navbar in px. This code closes subnavs when the navbar is not expanded.
	useEffect(() => {
		if (width < 240 && showSub) {
			setShowSub(false);
		}
	}, [width, showSub]);

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
			onChange={() => setShowSub(!showSub)}
			opened={showSub}
			variant="filled"
		>
			{item.links?.map((subItem: NavItem) => (
				<NavLink
					classNames={{
						root: classes.link,
						label: classes["link-label"],
					}}
					className={cx(classes["sub-link"], classes["link-label"], {
						[classes["sub-link-active"]]: location.href === subItem.link,
					})}
					component={Link}
					to={subItem.link}
					key={subItem.label}
					href={subItem.link}
					label={subItem.label}
					leftSection={subItem.icon}
					variant="subtle"
					active={location.href === subItem.link}
				></NavLink>
			))}
		</NavLink>
	));

	return (
		<Paper
			ref={ref}
			visibleFrom={isDrawer ? undefined : "xs"}
			component="nav"
			className={cx(classes.navbar, {
				[classes["navbar-collapsed"]]: expanded === false,
			})}
		>
			<Group justify="space-between">
				<Logo />

				<Group align="baseline">
					<ActionIcon
						display={isDrawer ? "none" : ""}
						variant={expanded ? "filled" : "outline"}
						aria-label={expanded ? "pin-nav" : "unpin-nav"}
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? <IconPinnedFilled /> : <IconPin />}
					</ActionIcon>
					<ThemeSwitch />
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
