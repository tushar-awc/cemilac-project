package com.iso.util;

import java.util.Collections;
import java.util.List;

import com.iso.dto.ErrorDTO;
import com.iso.response.ApiResponse;

public class ResponseBuilder {

    private ResponseBuilder() {

    }

    public static <T> ApiResponse<T> getOkResponse(String code, String message, T data) {
        return new ApiResponse<>(code, message, data, null, null);
    }

    public static <T> ApiResponse<T> getOkResponse(String code, String message, T data, String status) {
        return new ApiResponse<>(code, message, data, null, status);
    }

    public static <T> ApiResponse<T> getErrorResponse(ErrorDTO errorDTO) {
        return new ApiResponse<>("failure", null, null, Collections.singletonList(errorDTO), null);
    }

    public static <T> ApiResponse<T> getErrorResponse(List<ErrorDTO> errorDTOs) {
        return new ApiResponse<>("failure", null, null, errorDTOs, null);
    }

}
