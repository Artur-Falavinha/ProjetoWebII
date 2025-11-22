package com.tads4.webdois.web.dto;

import java.math.BigDecimal;

public record CategoriaResponse(
        Integer value,
        String label,
        BigDecimal valorBase) {
}
