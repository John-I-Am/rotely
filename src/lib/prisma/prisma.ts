// per docs, when not using prisma accelerate:

// avoid instantiating PrismaClient globally in long-lived environments.
// Instead, create and dispose of the client per request to prevent exhausting your database connections.

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export default prisma;
