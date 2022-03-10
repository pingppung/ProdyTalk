package com.example.ProdyTalk;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.ProdyTalk.mapper")
public class ProdyTalkApplication {
	public static void main(String[] args) {
		SpringApplication.run(ProdyTalkApplication.class, args);
	}
}