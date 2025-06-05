package br.com.fiap.dao;

import br.com.fiap.model.LocalSeguro;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LocalSeguroDAO {

    private Connection conn;

    public LocalSeguroDAO(Connection conn) {
        this.conn = conn;
    }


    public LocalSeguro buscar(String origem) {

        LocalSeguro localSeguro = null;

        String sql = "SELECT * FROM LocalSeguro where origem = ? and flagSeguro = true";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, origem);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet.next()) {
                localSeguro = new LocalSeguro(resultSet.getInt("id"), resultSet.getString("origem"), resultSet.getString("destino"), resultSet.getBoolean("flagSeguro"));
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
        return localSeguro;
    }
}
