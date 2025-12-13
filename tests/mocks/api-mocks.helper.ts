// tests/helpers/api-mock.helper.ts
import {Page} from '@playwright/test';
import jwt from 'jsonwebtoken';

// Generate a valid JWT token for testing
export function generateTestToken() {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-test-secret-key';

    return jwt.sign(
        {
            userId: '507f1f77bcf86cd799439011',
            email: 'test@example.com'
        },
        JWT_SECRET,
        {expiresIn: '1d'}
    );
}

// Setup auth cookie
export async function setupAuthCookie(context: any) {
    const token = generateTestToken();

    await context.addCookies([
        {
            name: 'token',
            value: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        }
    ]);
}

// Setup API mocks
export async function setupApiMocks(page: Page) {
    await page.route('**/api/**', async (route) => {
        const url = route.request().url();
        const method = route.request().method();

        console.log(`API Call: ${method} ${url}`);

        // Mock /api/me endpoint (profile/auth check)
        if (url.includes('/api/me')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    user: {
                        id: '507f1f77bcf86cd799439011',
                        email: 'test@example.com',
                        name: 'Test User',
                        createdAt: '2024-01-01T00:00:00.000Z'
                    }
                })
            });
        }
        // Mock /api/tasks endpoint
        else if (url.includes('/api/tasks')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    tasks: [
                        {
                            id: '507f1f77bcf86cd799439012',
                            title: 'Test Task',
                            description: 'Test Description',
                            status: 'todo',
                            priority: 'medium',
                            userId: '507f1f77bcf86cd799439011',
                            createdAt: '2024-01-01T00:00:00.000Z',
                            updatedAt: '2024-01-01T00:00:00.000Z'
                        }
                    ]
                })
            });
        } else {
            await route.continue();
        }
    });
}