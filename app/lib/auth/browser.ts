import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

const { useSession } = authClient;

export { authClient, useSession };
