package br.com.fiap.bo;

import br.com.fiap.exception.TamanhoListaException;
import br.com.fiap.model.repository.LocalSeguroRepository;
import br.com.fiap.model.vo.LocalSeguro;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class LocalSeguroBO {
    @Inject
    private LocalSeguroRepository localSeguroRepository;

    public LocalSeguro buscarLocalSeguro(String seguro) {
        try {
            List<LocalSeguro> locaisSeguros = localSeguroRepository.buscarPorNome(seguro);
            return locaisSeguros.get(0);
        } catch (Exception ex) {
            throw new TamanhoListaException("Não há itens suficientes para esse comando.");
        }
    }
}