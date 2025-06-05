package br.com.fiap.bo;

import br.com.fiap.config.ConnectionFactory;
import br.com.fiap.dao.LocalizacaoDAO;
import br.com.fiap.model.Localizacao;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Connection;
import java.sql.SQLException;

@ApplicationScoped
public class LocalizacaoBO {
    private ConnectionFactory connection;

    public LocalizacaoBO() {
        this.connection = new ConnectionFactory();
    }

    public void salvarLocalizacao(Localizacao localizacao) throws SQLException {
        Connection conn = connection.recuperarConexao();
        new LocalizacaoDAO(conn).salvar(localizacao);
    }

    public Localizacao buscarLocalizacao(int id) throws SQLException {
        Connection conn = connection.recuperarConexao();
        LocalizacaoDAO localizacaoDAO = new LocalizacaoDAO(conn);
        return localizacaoDAO.buscar(id);

    }
}
