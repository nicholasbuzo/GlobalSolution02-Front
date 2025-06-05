package br.com.fiap.dao;

import br.com.fiap.model.TipoDesastre;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TipoDesastreDAO {

    private Connection conn;

    public TipoDesastreDAO(Connection conn) {
        this.conn = conn;
    }


    public TipoDesastre buscar(String nome) {

        TipoDesastre tipoDesastre = null;

        String sql = "SELECT * FROM TipoDesastre where nome like '%?%'";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, nome);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet.next()) {
                tipoDesastre = new TipoDesastre(resultSet.getInt("id"), resultSet.getString("nome"), resultSet.getInt("nivel"), resultSet.getString("descricao"));
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
        return tipoDesastre;
    }
}
