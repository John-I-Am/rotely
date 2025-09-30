import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
	schema: "src/lib/prisma/schema.prisma",
});
