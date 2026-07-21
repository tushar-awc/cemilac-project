package com.iso.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class HostValidationFilter extends GenericFilterBean {

    @Value("${trusted.domains}")
    private List<String> trustedDomains;

    public HostValidationFilter(List<String> trustedDomains) {
        this.trustedDomains = trustedDomains;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String requestHost = request.getServerName();

        if (isHostTrusted(requestHost)) {

            chain.doFilter(request, response);
        } else {

            response.getWriter().write("Unauthorized Host");
            response.setContentType("text/plain");
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private boolean isHostTrusted(String host) {
        return trustedDomains.contains(host) || isIpAddress(host);
    }

    private boolean isIpAddress(String host) {

        return host.matches("\\d{1,3}(\\.\\d{1,3}){3}|([0-9a-fA-F]*:[0-9a-fA-F:]+)");
    }
}
