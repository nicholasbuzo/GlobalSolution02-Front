package br.com.fiap.bo;

import br.com.fiap.config.ConnectionFactory;
import br.com.fiap.dao.DadosClimaticosDAO;
import br.com.fiap.model.DadosClimaticos;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Connection;
import java.sql.SQLException;

@ApplicationScoped
public class DadosClimaticosBO {
    private ConnectionFactory connection;

    public DadosClimaticos buscarDadosClimaticos(int id) throws SQLException {
        Connection conn = connection.recuperarConexao();
        DadosClimaticosDAO dadosClimaticosDAO = new DadosClimaticosDAO(conn);
        return dadosClimaticosDAO.buscar(id);

    }
}
