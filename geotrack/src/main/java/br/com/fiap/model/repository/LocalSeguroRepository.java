package br.com.fiap.model.repository;

import br.com.fiap.model.vo.LocalSeguro;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class LocalSeguroRepository implements PanacheRepository<LocalSeguro> {

    public List<LocalSeguro> buscarPorNome(String seguro) {
        return find("nome like ?1", "%" + seguro + "%").list();
    }
}