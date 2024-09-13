package kr.co.iei.convention.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.convention.model.service.ConventionService;
import kr.co.iei.util.FileUtils;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@CrossOrigin("*")
@RequestMapping("/convention")
public class ConventionController {

    @Autowired
    private ConventionService conventionService;

    @Autowired
    private FileUtils fileUtils;

    @Value("${file.root}")
    public String root;


    @GetMapping
    public String conventionMain() {
        LocalDate date = LocalDate.now();
        System.out.println(date);
        return "d";
    }
    
    

}
