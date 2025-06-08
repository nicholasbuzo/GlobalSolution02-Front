package br.com.fiap.model.vo;

import jakarta.persistence.*;

@Entity
@Table(name = "localSeguro")
public class LocalSeguro {
    @Id
    private Long id;

    @Column(name = "origem")
    private String origem;

    @Column(name = "destino")
    private String destino;

    @Column(name = "flagSeguro")
    private int flagSeguro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public int getFlagSeguro() {
        return flagSeguro;
    }

    public void setFlagSeguro(int flagSeguro) {
        this.flagSeguro = flagSeguro;
    }
}
