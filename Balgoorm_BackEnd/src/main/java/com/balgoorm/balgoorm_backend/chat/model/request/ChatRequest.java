package com.balgoorm.balgoorm_backend.chat.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {
    private String name; // 채팅을 보낸 사람
    private String message; // 메시지
}
