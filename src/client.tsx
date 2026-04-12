import "@/lib/dayjs"; // Load first to initialise plugins otherwise it'll throw error in production build
import { StartClient } from "@tanstack/react-start/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(
	document,
	<StrictMode>
		<StartClient />
	</StrictMode>,
);
