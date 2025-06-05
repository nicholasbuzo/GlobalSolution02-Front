package br.com.fiap.dao;

import br.com.fiap.model.Localizacao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LocalizacaoDAO {

    private Connection conn;

    public LocalizacaoDAO(Connection conn) {
        this.conn = conn;
    }

    public void salvar(Localizacao localizacao) {
        String sql = "INSERT into DadosClimaticos(id, cidade, estado, pais) VALUES(?, ?, ?, ?)";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, localizacao.getId());
            ps.setString(2, localizacao.getCidade());
            ps.setString(3, localizacao.getEstado());
            ps.setString(4, localizacao.getPais());
            ps.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public Localizacao buscar(int id) {

        Localizacao localizacao = null;

        String sql = "SELECT * FROM Localizacao where id = ?";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet.next()) {
                localizacao = new Localizacao(resultSet.getInt("id"), resultSet.getString("cidade"), resultSet.getString("estado"), resultSet.getString("pais"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return localizacao;
    }
}