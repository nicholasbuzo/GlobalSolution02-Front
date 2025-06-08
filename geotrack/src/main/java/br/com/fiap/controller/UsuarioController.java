package br.com.fiap.controller;

import br.com.fiap.bo.UsuarioBO;
import br.com.fiap.dto.UsuarioDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;

@Path("/usuario")
public class UsuarioController {

    @Inject
    private UsuarioBO usuarioBO;

    @GET
    @Path("{id}")
    public UsuarioDTO buscarUsuarioPor(Long id) {
        return usuarioBO.buscarUsuario(id);
    }

    @POST
    public RestResponse<Void> salvarUsuario(UsuarioDTO usuario, @Context UriInfo uriInfo) {
        usuarioBO.salvarUsuario(usuario);
        return RestResponse.created(uriInfo.getAbsolutePath());
    }

    @PUT
    public RestResponse<Void> atualizarEmail(UsuarioDTO usuario) {
        usuarioBO.atualizarUsuario(usuario);
        return RestResponse.ok();
    }

    @GET
    public List<UsuarioDTO> listarUsuario() {
        return usuarioBO.listarUsuario();
    }

    @DELETE
    @Path("{id}")
    public boolean deletarUsuarioPor(Long id) {
        return usuarioBO.excluirUsuario(id);
    }
}