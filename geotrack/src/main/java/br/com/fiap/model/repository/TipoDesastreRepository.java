package br.com.fiap.model.repository;

import br.com.fiap.model.vo.TipoDesastre;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class TipoDesastreRepository implements PanacheRepository<TipoDesastre> {

    public List<TipoDesastre> buscarPorNome(String desastre) {
        return find("nome like ?1", "%" + desastre + "%").list();
    }
}
