package br.com.fiap.model;

import java.time.LocalDateTime;

public class Alerta {

    private int id;
    private Usuario usuario;
    private Localizacao localizacao;
    private LocalDateTime dataHora;
    private String mensagem;

    public Alerta(int id, Usuario usuario, Localizacao localizacao, LocalDateTime dataHora, String mensagem) {
        this.id = id;
        this.usuario = usuario;
        this.localizacao = localizacao;
        this.dataHora = dataHora;
        this.mensagem = mensagem;
    }

    public int getId() {
        return id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getMensagem() {
        return mensagem;
    }

}
