package com.iso.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CertificateNameDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String certificateName;

    private String certificatType;
}
