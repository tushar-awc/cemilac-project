package com.iso.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import javax.annotation.PostConstruct;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import ch.qos.logback.core.filter.Filter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	
    @Value("${trusted.domains}")
    private List<String> trustedDomains;
    @PostConstruct
    public void init() {
        System.out.println("Domains name = " + trustedDomains);
    }
    /*
     * @Bean public HttpFirewall configureFirewall() { StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
     * strictHttpFirewall.setAllowedHttpMethods(Arrays.asList("GET", "POST", "DELETE")); return strictHttpFirewall; }
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .addFilterBefore(hostValidationFilter(), CsrfFilter.class)
                .addFilterBefore(new CustomFilter(), CsrfFilter.class).csrf().disable().cors().and().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/iso/**").permitAll().antMatchers(HttpMethod.POST, "/iso/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/iso/**").permitAll().and().formLogin().loginPage("/login").and()
                .headers().frameOptions().disable().httpStrictTransportSecurity().disable()
                .addHeaderWriter(new StaticHeadersWriter("Referrer-Policy", "same-origin"))
                .addHeaderWriter(new StaticHeadersWriter("X-XSS-Protection", "1; mode=block")).and().exceptionHandling()
                .accessDeniedHandler(new CustomAccessDeniedHandler());
    }

    @Bean
    public javax.servlet.Filter hostValidationFilter() {
        return new HostValidationFilter(trustedDomains);
    }

    private static class CustomFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                FilterChain filterChain) throws ServletException, IOException {
            response.setHeader("Allow", "GET, DELETE, POST");

            filterChain.doFilter(request, response);
        }
    }

    public static class CustomAccessDeniedHandler implements AccessDeniedHandler {
        @Override
        public void handle(HttpServletRequest request, HttpServletResponse response,
                AccessDeniedException accessDeniedException) throws IOException, ServletException {
            response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
            response.setHeader("Allow", "GET, DELETE, POST");

            response.getWriter().write("Custom 405 Method Not Allowed Content");
            response.getWriter().flush();
        }
    }
}
