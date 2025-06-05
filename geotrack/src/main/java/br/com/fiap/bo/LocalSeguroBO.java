package br.com.fiap.bo;

import br.com.fiap.config.ConnectionFactory;
import br.com.fiap.dao.LocalSeguroDAO;
import br.com.fiap.model.LocalSeguro;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Connection;
import java.sql.SQLException;

@ApplicationScoped
public class LocalSeguroBO {
    private ConnectionFactory connection;

    public LocalSeguroBO() {
        this.connection = new ConnectionFactory();
    }

    public LocalSeguro buscarLocalSeguro(String origem) throws SQLException {
        Connection conn = connection.recuperarConexao();
        LocalSeguroDAO localSeguroDAO = new LocalSeguroDAO(conn);
        return localSeguroDAO.buscar(origem);
    }
}