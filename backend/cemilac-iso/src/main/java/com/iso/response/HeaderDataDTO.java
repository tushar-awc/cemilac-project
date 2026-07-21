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

public class HeaderDataDTO implements Serializable {

    public static final long serialVersionUID = 0;

    private String daid;

    private String daname;

}
