package br.com.fiap.controller;

import br.com.fiap.bo.UsuarioBO;
import br.com.fiap.model.Usuario;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.resteasy.reactive.RestResponse;

import java.sql.SQLException;
import java.util.List;

@Path("/usuario")
public class UsuarioController {

    @Inject
    private UsuarioBO usuarioBO;

    @GET
    @Path("{id}")
    public Usuario buscarUsuarioPor(int id) throws SQLException {
        return usuarioBO.buscarUsuario(id);
    }

    @POST
    public RestResponse<Void> salvarUsuario(Usuario usuario, @Context UriInfo uriInfo) throws SQLException {
        usuarioBO.salvarUsuario(usuario);
        return RestResponse.created(uriInfo.getAbsolutePath());
    }

    @PUT
    public RestResponse<Void> atualizarEmail(Usuario usuario) throws SQLException {
        usuarioBO.atualizarUsuario(usuario);
        return RestResponse.ok();
    }

    @GET
    public List<Usuario> listarUsuario() throws SQLException {
        return usuarioBO.listarUsuario();
    }

    @DELETE
    @Path("{id}")
    public boolean deletarUsuarioPor(int id) throws SQLException {
        return usuarioBO.excluirUsuario(id);
    }
}