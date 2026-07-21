package com.iso.controller;

import com.iso.controller.BaseController;
import com.iso.dto.ErrorDTO;
import com.iso.exception.ProjectRegistrationService;
import com.iso.request.dto.ProjectRegistration;
import com.iso.response.ApiResponse;
import com.iso.util.ResponseBuilder;

import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping({ "api/v1/project-registration" })
public class ProjectRegistrationController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(com.iso.controller.ProjectRegistrationController.class);

    @Autowired
    private ProjectRegistrationService projectRegistrationService;

    @GetMapping({ "status" })
    public String ping() {
        return "200";
    }

    @PostMapping
    public ApiResponse<ProjectRegistration> saveProjectRegistrationDetails(
            @RequestBody ProjectRegistration projectRegistration) {
        log.info(
                "START Cursor is in saveProjectRegistrationDetails method of the ProjectRegistrationController class.");

        try {
            ApiResponse<ProjectRegistration> apiResponse = this.projectRegistrationService.save(projectRegistration);

            log.info(
                    "END Cursor is in saveProjectRegistrationDetails method of the ProjectRegistrationController class.");

            String excelFilePath = apiResponse.getMessage();
            System.out.println("Excel file path in ProjectRegistrationController controller is-" + excelFilePath);
            return apiResponse;
        } catch (Exception ex) {
            return ResponseBuilder.getErrorResponse(new ErrorDTO("failure", ex.getMessage()));
        }
    }
}