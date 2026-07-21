package com.iso.response;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class DownloadRegistFormDataDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String appref;

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

    private String pincode;

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
