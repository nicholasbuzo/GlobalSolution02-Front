package br.com.fiap.model;

public class Localizacao {

    private int id;
    private String cidade;
    private String estado;
    private String pais;

    public Localizacao(int id, String cidade, String pais, String estado) {
        this.id = id;
        this.cidade = cidade;
        this.pais = pais;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String getPais() {
        return pais;
    }

}
