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

public class DashboardDataDTO implements Serializable {

    private static final long serialVersionUID = -4345484517784316592L;

    private String projectID;

    private String projectPartNumber;

    private String projectName;

    private String status;

}
