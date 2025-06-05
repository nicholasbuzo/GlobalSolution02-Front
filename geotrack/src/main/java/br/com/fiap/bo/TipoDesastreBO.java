package br.com.fiap.bo;

import br.com.fiap.config.ConnectionFactory;
import br.com.fiap.dao.TipoDesastreDAO;
import br.com.fiap.model.TipoDesastre;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Connection;
import java.sql.SQLException;

@ApplicationScoped
public class TipoDesastreBO {
    private ConnectionFactory connection;
    public TipoDesastreBO() {
        this.connection = new ConnectionFactory();
    }

    public TipoDesastre buscarTipoDesastre(String nome) throws SQLException {
        Connection conn = connection.recuperarConexao();
        TipoDesastreDAO tipoDesastreDAO = new TipoDesastreDAO(conn);
        return tipoDesastreDAO.buscar(nome);
    }
}

