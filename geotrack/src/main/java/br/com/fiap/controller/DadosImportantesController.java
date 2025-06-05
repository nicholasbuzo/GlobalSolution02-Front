package br.com.fiap.controller;

import br.com.fiap.bo.DadosImportantesBO;
import br.com.fiap.dto.DadosImportantesDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;

import java.sql.SQLException;

@Path("/dadosImportantes")
public class DadosImportantesController {

    @Inject
    private DadosImportantesBO dadosImportantesBO;

    @GET
    @Path("{id}")
    public DadosImportantesDTO buscarDadosImportantesPor(int id) throws SQLException {
        return dadosImportantesBO.buscarDadosImportantes(id);
    }
}
