package com.iso.util;

import javax.servlet.http.HttpServletRequest;
import com.iso.dto.ErrorDTO;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonFunction {

    public String templateNo;

    public ErrorDTO getErrorDTO(String errorCode, String message) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(errorCode);
        errorDTO.setMessage(message);
        return errorDTO;
    }

    public static String getTemplateNo() {
        return templateNo;
    }

    public static void setTemplateNo(String templateNo) {
        CommonFunction.templateNo = "template" + templateNo + "/";
    }

    private static final String[] IP_HEADERS = { "X-Forwarded-For", "Proxy-Client-IP", "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", "HTTP_X_CLUSTER_CLIENT_IP", "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR", "HTTP_FORWARDED", "HTTP_VIA", "REMOTE_ADDR"

            // you can add more matching headers here ...
    };

    public static String getRequestIP(HttpServletRequest request) {
        for (String header : IP_HEADERS) {
            String value = request.getHeader(header);
            if (value == null || value.isEmpty()) {
                continue;
            }
            String[] parts = value.split("\\s*,\\s*");
            return parts[0];
        }
        return request.getRemoteAddr();
    }
}
