package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Categoria;
import com.tads4.webdois.web.dto.CategoriaRequest;
import com.tads4.webdois.web.dto.CategoriaResponse;

public class CategoriaMapper {
    public static CategoriaResponse toResponse(Categoria categoria) {
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNome());
    }

    public static Categoria toEntity(CategoriaRequest categoria) {
        return Categoria.builder()
                .nome(categoria.nome())
                .build();
    }
}
