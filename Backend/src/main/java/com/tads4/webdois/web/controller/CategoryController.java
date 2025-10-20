package com.tads4.webdois.web.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.tads4.webdois.infra.repository.CategoryRepository;
import com.tads4.webdois.web.dto.*;
import com.tads4.webdois.domain.Category;
import com.tads4.webdois.infra.mapper.CategoryMapper;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Categorias", description = "Operações relacionadas às categorias")
public class CategoryController {

    private final CategoryRepository repo;

    public CategoryController(CategoryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    @Operation(summary = "Listar todas as categorias", description = "Retorna uma lista de todas as categorias cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    public List<CategoryResponse> findAll() {
        return repo.findAll().stream().map(CategoryMapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar categoria por ID", description = "Retorna uma categoria específica pelo seu ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoria encontrada"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public CategoryResponse findById(@Parameter(description = "ID da categoria", example = "1") @PathVariable Integer id) {
        Category category = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
        return CategoryMapper.toResponse(category);
    }

    @PostMapping
    @Operation(summary = "Criar nova categoria", description = "Cria uma nova categoria a partir dos dados enviados.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Categoria criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos ou categoria já existente")
    })
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryRequest request) {
        if (repo.existsByName(request.name())) {
            throw new RuntimeException("Categoria já cadastrada");
        }
        Category category = repo.save(CategoryMapper.toEntity(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(CategoryMapper.toResponse(category));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar categoria", description = "Atualiza os dados de uma categoria existente.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoria atualizada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public CategoryResponse update(@Parameter(description = "ID da categoria", example = "1") @PathVariable Integer id, @Valid @RequestBody CategoryRequest request) {
        Category foundCategory = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
        foundCategory.setName(request.name());
        Category category = repo.save(foundCategory);
        return CategoryMapper.toResponse(category);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir categoria", description = "Remove uma categoria pelo ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Categoria excluída com sucesso"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public ResponseEntity<Void> delete(@Parameter(description = "ID da categoria", example = "1") @PathVariable Integer id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
