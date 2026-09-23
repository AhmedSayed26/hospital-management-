package com.hospital.Hospital_Management_System.config;

import com.hospital.Hospital_Management_System.config.security.jwt.AuthTokenFilter;
import com.hospital.Hospital_Management_System.config.security.jwt.JwtAuthEntryPoint;
import com.hospital.Hospital_Management_System.config.security.jwt.JwtUtils;
import com.hospital.Hospital_Management_System.config.security.userService.CustomerUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@RequiredArgsConstructor

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfiguration {

    private final CustomerUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;
    private final JwtAuthEntryPoint authEntryPoint;

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthTokenFilter authTokenFilter(){
        return  new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
            throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(getPasswordEncoder());
        return authProvider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:5173",
                "http://localhost:4200",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:4200"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer :: disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(authEntryPoint))

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/h2-console/**"
                        ).permitAll()

                        .requestMatchers("/api/patients", "/api/patients/**")
                        .hasAnyAuthority("USER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/doctors", "/api/doctors/**")
                        .hasAnyAuthority("USER", "ADMIN")

                        .requestMatchers("/api/doctors", "/api/doctors/**")
                        .hasAuthority("ADMIN")

                        .requestMatchers("/api/appointments", "/api/appointments/**")
                        .hasAnyAuthority("USER", "ADMIN")

                        .requestMatchers("/api/rooms", "/api/rooms/**")
                        .hasAnyAuthority("USER", "ADMIN")

                        .requestMatchers("/api/dashboard/patient")
                        .hasAuthority("USER")

                        .requestMatchers("/api/dashboard/doctor")
                        .hasAuthority("ADMIN")

                        .anyRequest()
                        .permitAll()
                );

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authTokenFilter() , UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
