package com.store.backend.scopes;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
@Getter
@Setter
@Slf4j
public class ApplicationScopedBean {
    private int visitorCount;

    public void incrementVisitorCount() {
        visitorCount++;
    }

    public ApplicationScopedBean() {
        log.info("ApplicationScopedBean initialized");
    }
}
