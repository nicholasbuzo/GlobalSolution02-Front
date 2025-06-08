package br.com.fiap.bo;

import br.com.fiap.dto.UsuarioDTO;
import br.com.fiap.exception.IdInvalidoException;
import br.com.fiap.model.repository.UsuarioRepository;
import br.com.fiap.model.vo.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UsuarioBO {
    @Inject
    private UsuarioRepository usuarioRepository;
    @Transactional
    public void salvarUsuario(UsuarioDTO usuario) {
        Usuario entity = new Usuario();
        entity.setNome(usuario.getNome());
        entity.setEmail(usuario.getEmail());
        entity.setTelefone(usuario.getTelefone());
        usuarioRepository.persist(entity);
    }

    public List<UsuarioDTO> listarUsuario() {
        List<Usuario> usuarios = usuarioRepository.listAll();
        List<UsuarioDTO> dto = new ArrayList<>();
        usuarios.forEach(user->{
            dto.add(new UsuarioDTO(user.getNome(), user.getEmail(), user.getTelefone()));
        });
        return dto;
    }

    public UsuarioDTO buscarUsuario(Long id) {
        try {
            Usuario entity = usuarioRepository.findById(id);
            return new UsuarioDTO(entity.getNome(), entity.getEmail(), entity.getTelefone());
        } catch (Exception ex) {
            throw new IdInvalidoException("ID inválido");
        }
    }

    public void atualizarUsuario(UsuarioDTO usuario) {
        Usuario usuarioEntity = usuarioRepository.findById(usuario.getId());
        usuarioEntity.setEmail(usuario.getEmail());
        usuarioEntity.setTelefone(usuario.getTelefone());
        usuarioEntity.setNome(usuario.getNome());
        usuarioRepository.persist(usuarioEntity);
    }

    public boolean excluirUsuario(Long id) {
        return usuarioRepository.deleteById(id);
    }
}
