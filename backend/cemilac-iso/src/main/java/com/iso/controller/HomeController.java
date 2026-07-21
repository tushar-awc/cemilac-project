package com.iso.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.iso.response.HeaderDataDTO;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
    @GetMapping({ "/", "project-details" })
    public ModelAndView projectDetails(HttpServletRequest request, HttpServletResponse response) throws Exception {
        DashboardController staticdownload = new DashboardController();

        Object browserAttribute = request.getSession().getAttribute("browser");

        if (browserAttribute == null || "null".equals(browserAttribute.toString()) || browserAttribute.equals("open")) {
            staticdownload.browserCloseLogout(request);
        }
        /*
         * else {
         *
         * HttpSession s = request.getSession(); s.invalidate(); }
         */
        String page = "login";
        ModelAndView mv = new ModelAndView(page);
        return mv;
    }
}