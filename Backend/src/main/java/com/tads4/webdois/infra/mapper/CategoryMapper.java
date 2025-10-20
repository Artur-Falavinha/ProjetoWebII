package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Category;
import com.tads4.webdois.web.dto.CategoryRequest;
import com.tads4.webdois.web.dto.CategoryResponse;

public class CategoryMapper {
    public static CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName());
    }

    public static Category toEntity(CategoryRequest category) {
        return Category.builder()
                .name(category.name())
                .build();
    }
}
