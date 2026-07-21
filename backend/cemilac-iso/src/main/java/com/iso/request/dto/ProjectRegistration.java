package com.iso.request.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectRegistration implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 321342936457346724L;

    /* private String registrationId; */

    private String appReference;

    private String fname;

    private String lname;

    private String jtitle;

    private String contNum;

    private String email;

    private String compName;

    private String compAddress;

    private String compostoffice;

    private String state;

    private String dist;

    private int pincode;

    private String doadetails;

    private String doavalid;

    private String doascope;

    private String poadetails;

    private String poavalid;

    private String poascope;

    private String airSys;

    private String projDetail;
    private String partnum;

    private String imtar;

    private String customFile;

}
