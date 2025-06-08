package br.com.fiap.bo;

import br.com.fiap.dto.LocalizacaoDTO;
import br.com.fiap.exception.IdInvalidoException;
import br.com.fiap.model.repository.LocalizacaoRepository;
import br.com.fiap.model.vo.Localizacao;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class LocalizacaoBO {
    @Inject
    private LocalizacaoRepository localizacaoRepository;
    @Transactional
    public void salvarLocalizacao(LocalizacaoDTO localizacao) {
        Localizacao entity = new Localizacao();
        entity.setCidade(localizacao.getCidade());
        entity.setEstado(localizacao.getEstado());
        entity.setPais(localizacao.getPais());
        localizacaoRepository.persist(entity);
    }

    public LocalizacaoDTO buscarLocalizacao(Long id) {
        try {
            Localizacao entity = localizacaoRepository.findById(id);
            return new LocalizacaoDTO(entity.getCidade(), entity.getEstado(), entity.getPais());
        } catch (Exception ex) {
            throw new IdInvalidoException("ID inválido");
        }
    }
}
