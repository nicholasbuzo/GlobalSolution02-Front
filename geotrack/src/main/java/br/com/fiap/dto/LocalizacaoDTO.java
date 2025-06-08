package br.com.fiap.dto;

public class LocalizacaoDTO {

    private String cidade;
    private String estado;
    private String pais;

    public LocalizacaoDTO(String cidade, String estado, String pais) {
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
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

    @Override
    public String toString() {
        return "LocalizacaoDTO{" +
                "cidade='" + cidade + '\'' +
                ", estado='" + estado + '\'' +
                ", pais='" + pais + '\'' +
                '}';
    }
}
