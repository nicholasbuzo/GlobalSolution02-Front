package br.com.fiap.bo;

import br.com.fiap.dto.DadosImportantesDTO;
import br.com.fiap.dto.LocalizacaoDTO;
import br.com.fiap.model.vo.DadosClimaticos;
import br.com.fiap.model.vo.LocalSeguro;
import br.com.fiap.model.vo.TipoDesastre;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.sql.SQLException;
import java.util.Random;

@ApplicationScoped
public class DadosImportantesBO {

    @Inject
    private TipoDesastreBO tipoDesastreBO;
    
    @Inject
    private DadosClimaticosBO dadosClimaticosBO;

    @Inject
    private LocalSeguroBO localSeguroBO;

    @Inject
    private LocalizacaoBO localizacaoBO;

    public DadosImportantesDTO buscarDadosImportantes(Long id) throws SQLException {
        LocalizacaoDTO localizacao = localizacaoBO.buscarLocalizacao(id);
        LocalSeguro localSeguro = localSeguroBO.buscarLocalSeguro(localizacao.getEstado());
        TipoDesastre tipoDesastre = tipoDesastreBO.buscarTipoDesastre("furacao");
        double porcentagemRisco = calcularPorcentagemRisco(tipoDesastre.getNivel());
        DadosImportantesDTO dadosImportantesDTO = new DadosImportantesDTO(tipoDesastre.getNome(),porcentagemRisco, localSeguro.getDestino());
        return dadosImportantesDTO;
    }

    private double calcularPorcentagemRisco(int nivel) throws SQLException {
        Random random = new Random();
        Long numero = random.nextLong(5) + 1;
        DadosClimaticos dadosClimaticos = dadosClimaticosBO.buscarDadosClimaticos(numero);
        return (nivel*0.4 + dadosClimaticos.getTemperatura()*0.2 + dadosClimaticos.getUmidade()*0.2 + dadosClimaticos.getVelocidadeVento()*0.2) / 66 * 100;
    }
}