package br.com.fiap.config;

import oracle.jdbc.pool.OracleDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionFactory {
    private String url = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl";

    public Connection recuperarConexao() throws SQLException {
        return oracleDataSource().getConnection();
    }

    private OracleDataSource oracleDataSource() throws SQLException {

        OracleDataSource ods = new OracleDataSource();

        ods.setURL(url);
        ods.setUser(Login.user);
        ods.setPassword(Login.pwd);
        return ods;
    }
}

