import "@/lib/dayjs"; // Load first to initialise plugins otherwise it'll throw error in production build
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

export default createServerEntry({
	fetch(request) {
		return handler.fetch(request);
	},
});
