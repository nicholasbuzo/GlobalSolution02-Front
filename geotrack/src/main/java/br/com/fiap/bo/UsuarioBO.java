package br.com.fiap.bo;

import br.com.fiap.config.ConnectionFactory;
import br.com.fiap.dao.UsuarioDAO;
import br.com.fiap.exception.IdInvalidoException;
import br.com.fiap.model.Usuario;
import jakarta.enterprise.context.ApplicationScoped;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@ApplicationScoped
public class UsuarioBO {
    private ConnectionFactory connection;
    public UsuarioBO() {
        this.connection = new ConnectionFactory();
    }

    public void salvarUsuario(Usuario usuario) throws SQLException {
        Connection conn = connection.recuperarConexao();
        new UsuarioDAO(conn).salvar(usuario);
    }

    public List<Usuario> listarUsuario() throws SQLException {
        Connection conn = connection.recuperarConexao();
        UsuarioDAO usuarioDAO = new UsuarioDAO(conn);
        return usuarioDAO.listar();
    }

    public Usuario buscarUsuario(int id) throws SQLException {
        Connection conn = connection.recuperarConexao();
        UsuarioDAO usuarioDAO = new UsuarioDAO(conn);
        try {
            return usuarioDAO.buscar(id);
        } catch (Exception ex) {
            throw new IdInvalidoException("ID inválido");
        }
    }

    public void atualizarUsuario(Usuario usuario) throws SQLException {
        Connection conn = connection.recuperarConexao();
        new UsuarioDAO(conn).atualizar(usuario);
    }

    public boolean excluirUsuario(int id) throws SQLException {
        Connection conn = connection.recuperarConexao();
        UsuarioDAO usuarioDAO = new UsuarioDAO(conn);
        return usuarioDAO.excluir(id);
    }

}
