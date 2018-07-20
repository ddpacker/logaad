package com.logaad.lip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootConfiguration
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class LipApplication {

    public static void main(String[] args) {
        SpringApplication.run(LipApplication.class, args);
    }
}

@RestController
class GreetingController {
    
    @RequestMapping("/hello/{name}")
    String hello(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}