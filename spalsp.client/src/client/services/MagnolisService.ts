import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

import type { Message } from '../models/Message';

export class MagnolisService {

    /**
     * Test Celery
     * Test Celery worker.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static testCelery({
requestBody,
}: {
requestBody: Message,
}): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-celery/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Email
     * Test emails.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static testEmail({
emailTo,
}: {
emailTo: string,
}): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-email/',
            query: {
                'email_to': emailTo,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
