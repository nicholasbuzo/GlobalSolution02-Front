package br.com.fiap.model.vo;

import jakarta.persistence.*;

@Entity
@Table(name = "tipoDesastre")
public class TipoDesastre {
    @Id
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "nivel")
    private char nivel;

    @Column(name = "descricao")
    private String descricao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public char getNivel() {
        return nivel;
    }

    public void setNivel(char nivel) {
        this.nivel = nivel;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
