package com.iso.constants;

import java.util.HashMap;
import java.util.Map;

public enum UploadFileStatus {

    SUCCESS(0, "Success"), NOTEXIST(-1, "not exist"), SOCKETFAIL(-2, "Socket Fail"), BINDFAIL(-3, "Bind Fail"),
    SERVERNOTREADY(-4, "Server Not Ready"), RECIEVEFAIL(-5, "Recieve Fail"), ACKNOTRECV(-6, "Ack Not Recieve"),
    FINALACKNOTRECV(-7, "final aack not receive"), FEWFILESUPLOADED(-10, "Few files uploaded"),
    PEMISSIONDENIED(-13, "Permission denied"), SENDFAIL(-16, "Send Fail"), DONGLERROR(-17, "Dongle error"),
    INVALIDUPLOADMODE(-18, "Invalid upload mode"), TRANSFORMFAIL(-19, "transform fail"),
    GENERALERROR(-20, "General error"), AUTHFAIL(-21, "Auth fail"), LOCKUNAVAILABLE(-23, "Lock unavailable");

    private Integer val;
    private String valStatus;

    private static final Map<Integer, UploadFileStatus> valuesMap = new HashMap<>();

    static {
        for (UploadFileStatus st : values()) {
            valuesMap.put(st.val, st);
        }
    }

    UploadFileStatus(int val, String status) {
        this.val = val;
        this.valStatus = status;
    }

    public static UploadFileStatus valueOf(int val) {
        return valuesMap.get(val);
    }

    public String toString() {
        return this.valStatus;
    }

    void test() {
        UploadFileStatus c = UploadFileStatus.SUCCESS;
        c = UploadFileStatus.valueOf(0);
    }
}
