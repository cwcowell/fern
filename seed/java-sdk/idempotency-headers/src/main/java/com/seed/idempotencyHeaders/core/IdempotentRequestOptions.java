/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.idempotencyHeaders.core;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public final class IdempotentRequestOptions {
    private final String token;

    private final String idempotencyKey;

    private final String idempotencyExpiration;

    private final Optional<Integer> timeout;

    private final TimeUnit timeoutTimeUnit;

    private IdempotentRequestOptions(
            String token,
            String idempotencyKey,
            String idempotencyExpiration,
            Optional<Integer> timeout,
            TimeUnit timeoutTimeUnit) {
        this.token = token;
        this.idempotencyKey = idempotencyKey;
        this.idempotencyExpiration = idempotencyExpiration;
        this.timeout = timeout;
        this.timeoutTimeUnit = timeoutTimeUnit;
    }

    public Optional<Integer> getTimeout() {
        return timeout;
    }

    public TimeUnit getTimeoutTimeUnit() {
        return timeoutTimeUnit;
    }

    public Map<String, String> getHeaders() {
        Map<String, String> headers = new HashMap<>();
        if (this.token != null) {
            headers.put("Authorization", "Bearer " + this.token);
        }
        if (this.idempotencyKey != null) {
            headers.put("Idempotency-Key", this.idempotencyKey);
        }
        if (this.idempotencyExpiration != null) {
            headers.put("Idempotency-Expiration", this.idempotencyExpiration);
        }
        return headers;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private String token = null;

        private String idempotencyKey = null;

        private String idempotencyExpiration = null;

        private Optional<Integer> timeout = Optional.empty();

        private TimeUnit timeoutTimeUnit = TimeUnit.SECONDS;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder idempotencyKey(String idempotencyKey) {
            this.idempotencyKey = idempotencyKey;
            return this;
        }

        public Builder idempotencyExpiration(String idempotencyExpiration) {
            this.idempotencyExpiration = idempotencyExpiration;
            return this;
        }

        public Builder timeout(Integer timeout) {
            this.timeout = Optional.of(timeout);
            return this;
        }

        public Builder timeout(Integer timeout, TimeUnit timeoutTimeUnit) {
            this.timeout = Optional.of(timeout);
            this.timeoutTimeUnit = timeoutTimeUnit;
            return this;
        }

        public IdempotentRequestOptions build() {
            return new IdempotentRequestOptions(token, idempotencyKey, idempotencyExpiration, timeout, timeoutTimeUnit);
        }
    }
}
