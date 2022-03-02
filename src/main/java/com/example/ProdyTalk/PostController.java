package com.example.ProdyTalk;

import com.example.ProdyTalk.dto.UserForm;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    @PostMapping("/user/create")
    public String createArticle(UserForm form) {
        System.out.println(form.toString());
        return "";
    }
}
