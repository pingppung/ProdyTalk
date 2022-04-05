package com.example.ProdyTalk.contoller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VideoController implements ErrorController, com.example.ProdyTalk.contoller.ErrorController {


    @GetMapping({ "/error" })
    public String index() {
        return "index";
    }

    /*400에러 발생 시 getErrorPath() 호출*/
    @Override
    public String getErrorPath() {
        return "/error";
    }
}
