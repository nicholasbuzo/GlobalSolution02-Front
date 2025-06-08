package br.com.fiap.model.repository;

import br.com.fiap.model.vo.Localizacao;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class LocalizacaoRepository implements PanacheRepository<Localizacao> { }
