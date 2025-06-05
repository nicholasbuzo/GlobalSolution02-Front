package br.com.fiap.model;

public class LocalSeguro {

    private int id;
    private String origem;
    private String destino;
    private boolean flagSeguro;

    public LocalSeguro(int id, String origem, String destino, boolean flagSeguro) {
        this.id = id;
        this.origem = origem;
        this.destino = destino;
        this.flagSeguro = flagSeguro;
    }

    public int getId() {
        return id;
    }

    public String getOrigem() { return origem; }

    public String getDestino() {
        return destino;
    }

    public boolean getFlagSeguro() { return flagSeguro; }

}

