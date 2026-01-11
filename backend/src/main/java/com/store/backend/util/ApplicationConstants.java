package com.store.backend.util;

public class ApplicationConstants {

    private ApplicationConstants() {
        throw new AssertionError("Utility class cannot be instantiated");
    }

    public static final String ORDER_STATUS_CONFIRMED = "CONFIRMED";
    public static final String ORDER_STATUS_CREATED = "CREATED";
    public static final String ORDER_STATUS_CANCELLED = "CANCELLED";
}

