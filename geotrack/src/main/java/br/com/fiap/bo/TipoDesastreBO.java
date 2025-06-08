package br.com.fiap.bo;

import br.com.fiap.exception.TamanhoListaException;
import br.com.fiap.model.repository.TipoDesastreRepository;
import br.com.fiap.model.vo.TipoDesastre;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class TipoDesastreBO {
    @Inject
    private TipoDesastreRepository tipoDesastreRepository;

    public TipoDesastre buscarTipoDesastre(String desastre) {
        try {
            List<TipoDesastre> tipoDesastres = tipoDesastreRepository.buscarPorNome(desastre);
            return tipoDesastres.get(0);
        } catch (Exception ex) {
            throw new TamanhoListaException("Não há itens suficientes para esse comando.");
        }
    }
}

