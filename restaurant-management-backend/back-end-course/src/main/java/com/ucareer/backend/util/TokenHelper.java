package com.ucareer.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

public class TokenHelper {

    public static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public static final String SECRET = "asjkDFksh";

    public static final String TOKEN_PREFIX = "Bearer ";


    public static String GenerateToken(String username) {
        Date now = new Date();
        String base64EncodedSecret = Base64.getEncoder().encodeToString(SECRET.getBytes());
        JwtBuilder builder = Jwts.builder().setId(UUID.randomUUID().toString())
                .setIssuedAt(now)
                .setSubject(username)
                .setIssuer("ucareer")
                .signWith(SignatureAlgorithm.HS512, base64EncodedSecret)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME));

        String token = builder.compact();
        return token;
    }


    public static String VerifyToken(String token) throws Exception {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

}