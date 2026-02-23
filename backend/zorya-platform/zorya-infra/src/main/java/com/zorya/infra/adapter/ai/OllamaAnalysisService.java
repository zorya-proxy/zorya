package com.zorya.infra.adapter.ai;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zorya.core.domain.model.AiFinding;
import com.zorya.core.domain.port.SemanticAnalysisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class OllamaAnalysisService implements SemanticAnalysisService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public OllamaAnalysisService(
            ChatClient.Builder builder,
            ObjectMapper objectMapper,
            @Value("${ollama.dlp.system-prompt}") String systemPrompt) {

        this.chatClient = builder
                .defaultSystem(systemPrompt)
                .build();
        this.objectMapper = objectMapper;
    }

    @Override
    public List<AiFinding> analyze(String text) {
        if (text == null || text.trim().isEmpty()) {
            return List.of();
        }

        String rawJson = chatClient.prompt()
                .user(text)
                .call()
                .content();

        String cleanedJson = cleanJsonResponse(rawJson);

        try {
            List<AiFinding> findings = objectMapper.readValue(
                    cleanedJson,
                    new TypeReference<>() {
                    }
            );

            log.debug("=== OLLAMA MANUAL MAPPING ===");
            findings.forEach(f -> log.debug("{} | {} | {}", f.type(), f.value(), f.explanation()));
            log.debug("=====================================");

            return findings;

        } catch (JsonProcessingException e) {
            log.warn("Failed to parse Ollama JSON: {}. Returning empty list.", e.getMessage());
            return List.of();
        }
    }

    private String cleanJsonResponse(String json) {
        if (json == null || json.trim().isEmpty()) {
            return "[]";
        }
        return json.replaceAll("(?is)^```(?:json)?\\s*", "")
                .replaceAll("(?is)\\s*```$", "")
                .trim();
    }
}