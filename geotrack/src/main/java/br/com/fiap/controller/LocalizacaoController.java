package br.com.fiap.controller;

import br.com.fiap.bo.LocalizacaoBO;
import br.com.fiap.model.Localizacao;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.resteasy.reactive.RestResponse;

import java.sql.SQLException;

@Path("/localizacao")
public class LocalizacaoController {

    @Inject
    private LocalizacaoBO localizacaoBO;

    @GET
    @Path("{id}")
    public Localizacao buscarLocalizacaoPor(int id) throws SQLException {
        return localizacaoBO.buscarLocalizacao(id);
    }

    @POST
    public RestResponse<Void> salvarLocalizacao(Localizacao localizacao, @Context UriInfo uriInfo) throws SQLException {
        localizacaoBO.salvarLocalizacao(localizacao);
        return RestResponse.created(uriInfo.getAbsolutePath());
    }
}
