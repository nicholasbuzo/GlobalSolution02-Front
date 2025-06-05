package br.com.fiap.model;

public class TipoDesastre {

    private int id;
    private String nome;
    private int nivel;
    private String descricao;

    public TipoDesastre(int id, String nome, int nivel, String descricao) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
        this.descricao = descricao;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public int getNivel() {
        return nivel;
    }

    public String getDescricao() {
        return descricao;
    }

}
