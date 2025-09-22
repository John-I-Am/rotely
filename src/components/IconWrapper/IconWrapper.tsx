import type { Icon } from "@tabler/icons-react";

type IconWrapper = {
	icon: Icon;
	stroke?: number;
	size?: number;
};

export const IconWrapper = ({ icon, stroke, size }: IconWrapper) => {
	const Component = icon;
	return <Component stroke={stroke ?? 1.5} size={size ?? 32} />;
};
