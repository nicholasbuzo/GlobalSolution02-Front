package br.com.fiap.controller;

import br.com.fiap.bo.LocalizacaoBO;
import br.com.fiap.dto.LocalizacaoDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.resteasy.reactive.RestResponse;

@Path("/localizacao")
public class LocalizacaoController {

    @Inject
    private LocalizacaoBO localizacaoBO;

    @GET
    @Path("{id}")
    public LocalizacaoDTO buscarLocalizacaoPor(Long id) {
        return localizacaoBO.buscarLocalizacao(id);
    }

    @POST
    public RestResponse<Void> salvarLocalizacao(LocalizacaoDTO localizacao, @Context UriInfo uriInfo) {
        localizacaoBO.salvarLocalizacao(localizacao);
        return RestResponse.created(uriInfo.getAbsolutePath());
    }
}
