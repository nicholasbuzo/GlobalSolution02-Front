package br.com.fiap.dto;

public class DadosImportantesDTO {

    private String nomeDesastre;
    private double porcentagemRisco;
    private String localSeguro;

    public DadosImportantesDTO(String nomeDesastre, double porcentagemRisco, String localSeguro) {
        this.nomeDesastre = nomeDesastre;
        this.porcentagemRisco = porcentagemRisco;
        this.localSeguro = localSeguro;
    }

    public String getNomeDesastre() {
        return nomeDesastre;
    }

    public double getPorcentagemRisco() {
        return porcentagemRisco;
    }

    public String getLocalSeguro() {
        return localSeguro;
    }

}
