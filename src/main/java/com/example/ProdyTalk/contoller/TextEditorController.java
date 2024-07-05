package com.example.prodytalk.contoller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Slf4j
public class TextEditorController {

    @PostMapping("/api/texteditor/change")
    public void changeText(@RequestBody String text) {
        log.debug(text);
    }
}
