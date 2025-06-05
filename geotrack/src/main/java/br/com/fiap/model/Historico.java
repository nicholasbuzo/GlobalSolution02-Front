package br.com.fiap.model;

import java.time.LocalDateTime;

public class Historico {
    private int id;
    private Localizacao localizacao;
    private TipoDesastre tipoDesastre;
    private LocalDateTime dataHora;

    public Historico(int id, Localizacao localizacao, TipoDesastre tipoDesastre, LocalDateTime dataHora) {
        this.id = id;
        this.localizacao = localizacao;
        this.tipoDesastre = tipoDesastre;
        this.dataHora = dataHora;
    }

    public int getId() {
        return id;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public TipoDesastre getTipoDesastre() {
        return tipoDesastre;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

}
