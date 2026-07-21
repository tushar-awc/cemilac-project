package com.iso.config;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.PrintWriter;

public class NoAllowHeaderResponseWrapper extends HttpServletResponseWrapper {
    public NoAllowHeaderResponseWrapper(ServletResponse response) {
        super((HttpServletResponse) response);
    }

    @Override
    public void setHeader(String name, String value) {
        // Do not set the "Allow" header
        if (!"Allow".equalsIgnoreCase(name)) {
            super.setHeader(name, value);
        }
    }

    @Override
    public void addHeader(String name, String value) {
        // Do not add the "Allow" header
        if (!"Allow".equalsIgnoreCase(name)) {
            super.addHeader(name, value);
        }
    }
}
