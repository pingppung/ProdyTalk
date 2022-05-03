package com.example.ProdyTalk.contoller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class VideoController {

    @PostMapping("/api/video/setting")
    public void videoSetting() throws Exception{

    }
}





