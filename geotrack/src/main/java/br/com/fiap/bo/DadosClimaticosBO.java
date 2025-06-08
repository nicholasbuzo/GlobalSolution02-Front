package br.com.fiap.bo;

import br.com.fiap.exception.IdInvalidoException;
import br.com.fiap.model.repository.DadosClimaticosRepository;
import br.com.fiap.model.vo.DadosClimaticos;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class DadosClimaticosBO {
    @Inject
    private DadosClimaticosRepository dadosClimaticosRepository;

    public DadosClimaticos buscarDadosClimaticos(Long id) {
        try {
            return dadosClimaticosRepository.findById(id);
        } catch (Exception ex) {
            throw new IdInvalidoException("ID inválido");
        }
    }
}
