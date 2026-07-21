package com.iso.constants;

import java.util.HashMap;
import java.util.Map;

public enum DownloadFileStatus {

    SUCCESS(0, "Success"), SOCKETFAIL(-2, "Socket Fail"), BINDFAIL(-3, "Bind Fail"),
    SERVERNOTREADY(-4, "Server Not Ready"), RECIEVEFAIL(-5, "Recieve Fail"), ACKNOTRECV(-6, "Ack Not Recieve"),
    FILENOTAVAILABLE(-8, "File Not Available"), NOWRITEPERMISSION(-9, "No Write Permission"),
    FEWFILESUPLOADED(-10, "Few files downloaded"), DOWNLOADFAIL(-11, "Download Fail"),
    PERMISSIONDENIED(-14, "Permission Denied"), SENDFAIL(-16, "Send Fail"), DONGLERROR(-17, "Dongle error"),
    INVALIDUPLOADMODE(-18, "Invalid download mode"), TRANSFORMFAIL(-19, "De transform fail"),
    GENERALERROR(-20, "General error"), AUTHFAIL(-21, "Auth/Nounce Fail"), LOCKUNAVAILABLE(-23, "Lock unavailable");

    private Integer val;
    private String valStatus;

    private static final Map<Integer, DownloadFileStatus> valuesMap = new HashMap<>();

    static {
        for (DownloadFileStatus st : values()) {
            valuesMap.put(st.val, st);
        }
    }

    DownloadFileStatus(int val, String status) {
        this.val = val;
        this.valStatus = status;
    }

    public static DownloadFileStatus valueOf(int val) {
        return valuesMap.get(val);
    }

    public String toString() {
        return this.valStatus;
    }

    void test() {
        DownloadFileStatus c = DownloadFileStatus.SUCCESS;
        c = DownloadFileStatus.valueOf(0);
    }
}
