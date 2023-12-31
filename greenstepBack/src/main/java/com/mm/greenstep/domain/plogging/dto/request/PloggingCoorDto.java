package com.mm.greenstep.domain.plogging.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PloggingCoorDto {
    private String longitude; // 경도
    private String latitude; // 위도
}