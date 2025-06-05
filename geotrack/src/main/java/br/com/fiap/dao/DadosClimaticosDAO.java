package br.com.fiap.dao;

import br.com.fiap.model.DadosClimaticos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DadosClimaticosDAO {

    private Connection conn;

    public DadosClimaticosDAO(Connection conn) {
        this.conn = conn;
    }

    public DadosClimaticos buscar(int id) {

        DadosClimaticos dadosClimaticos = null;

        String sql = "SELECT * FROM DadosClimaticos where id = ?";

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet.next()) {
                dadosClimaticos = new DadosClimaticos(resultSet.getInt("id"), resultSet.getInt("temperatura"), resultSet.getInt("umidade"), resultSet.getInt("velocidadeVento"));
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
        return dadosClimaticos;
    }
}
