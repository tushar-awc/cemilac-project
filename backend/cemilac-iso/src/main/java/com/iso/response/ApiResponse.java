package com.iso.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.iso.dto.ErrorDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private String code;

    private String message;

    private T data;

    private List<ErrorDTO> errors;

    private String status;

}
