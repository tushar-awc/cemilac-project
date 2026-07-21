package com.iso.response;

import java.io.Serializable;

import com.iso.request.dto.ProjectRegistration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusFileDTO implements Serializable {

    private static final long serialVersionUID = -1352810607882202685L;

    private Long id;

    private String docName;

    private String status;

    private String remarks;

    private String docNeed;

}
