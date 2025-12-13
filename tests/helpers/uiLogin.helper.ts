import {APIRequestContext, BrowserContext} from "@playwright/test";

export async function apiLogin(
    request: APIRequestContext,
    context: BrowserContext
): Promise<void> {

    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
        throw new Error(
            "Missing TEST_USER_EMAIL or TEST_USER_PASSWORD in .env.test"
        );
    }
    const response = await request.post("/api/auth/login", {
        data: {email, password}
    });

    if (!response.ok()) {
        const text = await response.text();
        throw new Error(`Login failed: ${response.status()} - ${text}`);
    }

    const state = await request.storageState();
    await context.addCookies(state.cookies);
}
