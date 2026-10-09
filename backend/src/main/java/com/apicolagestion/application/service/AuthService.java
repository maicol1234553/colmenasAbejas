package com.apicolagestion.application.service;

import com.apicolagestion.application.dto.*;
import com.apicolagestion.domain.entities.Usuario;
import com.apicolagestion.infrastructure.repositories.UsuarioRepository;
import com.apicolagestion.infrastructure.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generarToken(usuario.getId(), usuario.getEmail());

        return AuthResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuarioId(usuario.getId())
                .nombre(usuario.getNombre() + " " + usuario.getApellido())
                .email(usuario.getEmail())
                .build();
    }

    public AuthResponse registro(RegistroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario nuevoUsuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .activo(true)
                .build();

        usuarioRepository.save(nuevoUsuario);

        String token = jwtService.generarToken(nuevoUsuario.getId(), nuevoUsuario.getEmail());

        return AuthResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuarioId(nuevoUsuario.getId())
                .nombre(nuevoUsuario.getNombre() + " " + nuevoUsuario.getApellido())
                .email(nuevoUsuario.getEmail())
                .build();
    }
}
